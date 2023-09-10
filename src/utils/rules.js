import * as yup from "yup";

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
  confirm_password: yup
    .string()
    .required("Password la bat buoc")
    .min(6, "Do dai tu 6-150 ky tu")
    .max(150, "Do dai tu 6-150 ky tu")
    .oneOf([yup.ref("password")], "Password khong trung hop"),
});

export const loginSchema = schema.omit(["confirm_password"]);
