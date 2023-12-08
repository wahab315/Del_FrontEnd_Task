import * as Yup from "yup";

// login Validation
export const loginValidation = Yup.object({
  email: Yup.string().email("Email is invalid").required("Required"),
  password: Yup.string().required("Required"),
});

// Car Registerration Form
export const carRegistrationForm = Yup.object({
  model: Yup.string()
    .min(3, "Must be 3 character")
    .max(35, "Must be 35 characters or less")
    .required("Required"),
  price: Yup.number()
    .integer("Must be a whole number")
    .positive("Must be a positive number")
    .typeError("Must be a number")
    .test("is-decimal", "Must have up to two decimal places", (value) =>
      value === undefined ? true : /^\d+(\.\d{1,2})?$/.test(value)
    )
    .required("Required"),
  phone: Yup.string()
    .required("Required")
    .matches(/^(?:\+92|92|0)([3456789]\d{9})$/, "Invalid phone number"),
  images: Yup.array().test(
    "maxImages",
    "Maximum of 10 images allowed",
    (value) => value.length <= 10
  ),
});
