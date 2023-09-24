import { useMutation, useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { keyBy } from "lodash";
import React, { useContext, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { purchaseApi } from "../apis/api";
import QuantityController from "../components/QuantityController";
import { AppContext } from "../context";
import { purchaseStatus } from "../utils/constants";
import { formatCurrency, generateNameId } from "../utils/functions";

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext);

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ["purchases", { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
  });
  const updatePurchaseMutation = useMutation({
    mutationFn: (body) => purchaseApi.updatePurchases(body),
    onSuccess: () => {
      refetch();
      // khi mà update số lượng, thì khi đó sẽ gọi api để update, sau khi api gọi update thành công thì sẽ refetch để gọi data về lại
      // khi đó thì sẽ nhảy vào useEffect ở dưới để đổi lại checked và disable = false
    },
  });

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch();
    },
  });

  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch();
      toast.success(data.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
    },
  });
  const purchaseInCart = purchasesInCartData?.data.data;

  // xem là có đang chọn tất cả hay ko, đưa cái này vào cái input của checked hết sản phẩm, để nó check và render ra
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked);

  const location = useLocation();
  const choosenPurchaseIdFromLocation = location.state?.purchaseId;

  // mỗi khi vào thì nó tạo một cái check array
  // rồi dùng cái extended purchases này để render ra
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, "_id");
      return (
        purchaseInCart?.map((item) => ({
          ...item,
          disabled: false,
          checked: Boolean(
            choosenPurchaseIdFromLocation === item._id ||
              extendedPurchasesObject[item._id]?.checked,
          ),
        })) || []
      );
    });
  }, [purchaseInCart]);

  const handleCheck = (productIndex) => (event) => {
    // cái này return về 1 function
    setExtendedPurchases(
      produce((prev) => {
        // immer là thư viện để đơn giản hoá việc change lại giá trị state, và render lại
        // dùng produce này, rồi cái prev chính là cái state của extendedpurchases trước đó, giờ mình đổi lại vị trí index là check là xong
        prev[productIndex].checked = event.target.checked;
      }),
    );
  };

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !isAllChecked,
      })),
    );
  };

  const handleQuantity = (itemIndex, value) => {
    const item = extendedPurchases[itemIndex];
    setExtendedPurchases(
      produce((prev) => {
        prev[itemIndex].disabled = true;
      }),
    );
    updatePurchaseMutation.mutate({
      product_id: item.product._id,
      buy_count: value,
    });
  };

  const handleTypeQuantity = (purchaseIndex) => (value) => {
    setExtendedPurchases(
      produce((prev) => {
        prev[purchaseIndex].buy_count = value;
      }),
    );
  };
  const hanldeDelete = (purchaseIndex) => {
    const purchaseId = extendedPurchases[purchaseIndex]._id;
    deletePurchaseMutation.mutate([purchaseId]);
  };

  const checkedPurchases = useMemo(
    () => extendedPurchases.filter((purchase) => purchase.checked),
    [extendedPurchases],
  );

  const checkedPurchasesCount = checkedPurchases.length;
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count;
      }, 0),
    [checkedPurchases],
  );
  const totalSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return (
          result +
          (current.product.price_before_discount - current.product.price) *
            current.buy_count
        );
      }, 0),
    [checkedPurchases],
  );
  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id);
    deletePurchaseMutation.mutate(purchaseIds);
  };

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count,
      }));
      buyPurchaseMutation.mutate(body);
    }
  };
  return (
    <div className="bg-neutral-100 py-16">
      <div className="container">
        <div className="overflow-auto">
          {/* overflow-auto giúp có scroll khi màn hình nhỏ, do ở div dưới có set min width*/}
          <div className="min-w-[1000px]">
            {/* Header for cart */}
            <div className="grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow">
              <div className="col-span-5">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 items-center justify-center pr-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-orange"
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className="flex-grow text-black">Sản phẩm</div>
                </div>
              </div>
              <div className="col-span-7">
                <div className="grid grid-cols-5 text-center">
                  <div className="col-span-2">Đơn giá</div>
                  <div className="col-span-1">Số lượng</div>
                  <div className="col-span-1">Số tiền</div>
                  <div className="col-span-1">Thao tác</div>
                </div>
              </div>
            </div>

            {/* All products */}
            <div className="my-3 rounded-sm bg-white p-5 shadow">
              {/* a product */}
              {extendedPurchases?.map((item, index) => (
                <div
                  key={item._id}
                  className="mt-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-sm text-gray-500 fist:mt-0"
                >
                  <div className="col-span-5">
                    <div className="flex">
                      <div className="flex flex-shrink-0 items-center justify-center pr-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-orange"
                          checked={item.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <Link
                            to={`/${generateNameId({
                              name: item.product.name,
                              id: item.product._id,
                            })}`}
                            className="h-20 w-20 flex-shrink-0"
                          >
                            <img
                              // className="object-cover h-full w-full"
                              src={item.product.image}
                              alt={item.product.name}
                            />
                          </Link>
                          <div className="flex-grow px-2 pb-2 pt-1">
                            <Link className="line-clamp-2">
                              {item.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-7">
                    <div className="flex h-full">
                      <div className="grid grid-cols-5 w-full items-center">
                        <div className="col-span-2">
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-gray-300 text-sm line-through">
                              đ{" "}
                              {formatCurrency(
                                item.product.price_before_discount,
                              )}
                            </span>
                            <span className="text-orange text-xl">
                              đ {formatCurrency(item.product.price)}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <QuantityController
                            classNameWrapper=""
                            max={item.product.quantity}
                            value={item.buy_count}
                            onIncrease={(value) => handleQuantity(index, value)}
                            onDecrease={(value) => handleQuantity(index, value)}
                            onType={handleTypeQuantity(index)}
                            disabled={item.disabled}
                            onFocusOut={(value) => handleQuantity(index, value)}
                          />
                        </div>
                        <div className="col-span-1 text-center">
                          <span className="text-orange text-xl">
                            đ{" "}
                            {formatCurrency(
                              item.buy_count * item.product.price,
                            )}
                          </span>
                        </div>
                        <div className="col-span-1 text-center">
                          <button
                            onClick={() => hanldeDelete(index)}
                            className="bg-none text-black transition-colors hover:text-orange"
                          >
                            Xoá
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 mt-10 flex rounded-sm border border-gray-100 bg-white pl-9 pr-5 py-5 shadow">
          <div className="flex w-full justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center justify-center pr-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-orange"
                  checked={isAllChecked}
                  onChange={handleCheckAll}
                />
              </div>
              <button className="mx-3 border-none bg-none">
                Chọn tất cả ({extendedPurchases.length})
              </button>
              <button
                onClick={handleDeleteManyPurchases}
                className="mx-3 border-none bg-none"
              >
                Xoá
              </button>
            </div>
            <div className="ml-auto mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center justify-end">
                  <div>
                    Tổng thanh toán ({checkedPurchasesCount} sản phẩm):{" "}
                  </div>
                  <div className="ml-2 text-2xl text-orange">
                    đ {formatCurrency(totalCheckedPurchasePrice)}
                  </div>
                </div>
                <div className="flex items-center justify-end text-sm">
                  <div className="text-gray-500">Tiết kiệm</div>
                  <div className="ml-6 text-orange">
                    đ {formatCurrency(totalSavingPrice)}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end sm:mt-0">
                <button
                  onClick={handleBuyPurchases}
                  disabled={buyPurchaseMutation.isLoading}
                  className="ml-4 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600"
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
