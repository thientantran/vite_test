import * as yup from "yup";

function testPriceMinMax() {
  const { price_min, price_max } = this.parent;
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}

//chú ý cách viết tên hàm
const checkPassword = (refString) => {
  return yup
    .string()
    .required("Password la bat buoc")
    .min(6, "Do dai tu 6-150 ky tu")
    .max(150, "Do dai tu 6-150 ky tu")
    .oneOf([yup.ref(refString)], "Password khong trung hop");
};
export const schema = yup.object({
  email: yup
    .string()
    .required("Email la bat buoc")
    .email("Email khong dung dinh dang")
    .min(6, "Do dai tu 6-150 ky tu")
    .max(150, "Do dai tu 6-150 ky tu"),
  password: yup
    .string()
    .required("Password la bat buoc")
    .min(6, "Do dai tu 6-150 ky tu")
    .max(150, "Do dai tu 6-150 ky tu"),
  // confirm_password: yup
  //   .string()
  //   .required("Password la bat buoc")
  //   .min(6, "Do dai tu 6-150 ky tu")
  //   .max(150, "Do dai tu 6-150 ky tu")
  //   .oneOf([yup.ref("password")], "Password khong trung hop"),
  confirm_password: checkPassword("password"),
  price_min: yup.string().test({
    name: "price-not-allowerd",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),
  price_max: yup.string().test({
    name: "price-not-allowerd",
    message: "Giá không phù hợp",
    // test(value) {
    //   const price_max = value;
    //   const { price_min } = this.parent;
    //   if (price_min !== "" && price_max !== "") {
    //     return Number(price_max) >= Number(price_min);
    //   }
    //   return price_min !== "" || price_max !== "";
    // },
    test: testPriceMinMax,
  }),
  name: yup.string().trim().required("Tên sản phẩm là bắt buộc!"),
});

export const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  phone: yup.string().max(20, "Độ dài tối đa là 20 ký tự"),
  address: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  avartar: yup.date().max(new Date(), "Hãy chọn ngày trong quá khứ"),
  password: yup
    .string()
    .required("Password la bat buoc")
    .min(6, "Do dai tu 6-150 ky tu")
    .max(150, "Do dai tu 6-150 ky tu"),
  new_password: yup
    .string()
    .required("Password la bat buoc")
    .min(6, "Do dai tu 6-150 ky tu")
    .max(150, "Do dai tu 6-150 ky tu"),

  confirm_password: checkPassword("new_password"),
});
export const profileSchema = userSchema.pick([
  "name",
  "address",
  "phone",
  "date_of_birth",
  "avatar",
]);
export const loginSchema = schema.pick(["email", "password"]);
export const registerSchema = schema.pick([
  "email",
  "password",
  "confirm_password",
]);
export const priceSchema = schema.pick(["price_min", "price_max"]);
export const nameSchema = schema.pick(["name"]);
export const passwordSchema = userSchema.pick([
  "password",
  "new_password",
  "confirm_password",
]);
