import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";

import useQueryConfig from "./useQueryConfig";
import { nameSchema } from "../utils/rules";

export default function useSearchProducts() {
  const queryConfig = useQueryConfig();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(nameSchema),
  });
  const navigate = useNavigate();
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name,
          },
          ["order", "sort_by"],
        )
      : { ...queryConfig, name: data.name };
    navigate({
      pathname: "/",
      search: createSearchParams(config).toString(),
    });
  });
  return { onSubmitSearch, register };
}
