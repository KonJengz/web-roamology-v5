import { number, object } from "yup";

// ดึงปีปัจจุบันมาใช้เป็นค่าสูงสุด
const currentYear = new Date().getFullYear();

export const schemaAboutMe = object({
  year: number()
    .integer("Year must be an integer") // ต้องเป็นเลขจำนวนเต็ม
    .min(2000, "Year must be 2000 or later") // กำหนดปีขั้นต่ำที่สมเหตุสมผล
    .max(currentYear, "Year cannot be in the future") // ปีต้องไม่เกินปีปัจจุบัน
    .required("Year is required"),

  month: number()
    .integer("Month must be an integer") // ต้องเป็นเลขจำนวนเต็ม
    .min(1, "Month must be between 1 and 12") // ค่าต่ำสุดคือ 1
    .max(12, "Month must be between 1 and 12") // ค่าสูงสุดคือ 12
    .required("Month is required"),
});
