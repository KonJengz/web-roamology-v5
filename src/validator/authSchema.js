import { object, ref, string } from "yup";

export const schemaRegister = object({
  email: string()
    .trim()
    .email("Email is invalid")
    .required("Email is required"),

  // 🔐 Password Best Practice
  password: string()
    .min(6, "Password must be at least 6 characters")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    // )
    .required("Password is required"),

  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  username: string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .required("Username is required"),

  //   imgUrl: string()
  //     .url("Image URL must be a valid URL") // ใช้ .url() เพื่อความแม่นยำ
  //     .max(500, "Image URL must be less than 500 characters"),

  //   // refreshToken:  <-- เอาออกจากที่นี่
});

export const schemaLogin = object({
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
