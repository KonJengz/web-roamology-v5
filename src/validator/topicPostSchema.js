import { string, object } from "yup";

export const schemaTopicPost = object({
  nameTopic: string()
    .trim() // ลบช่องว่างหน้า-หลัง
    .min(3, "Name Topic must be at least 3 characters")
    .max(100, "Name Topic must be less than 100 characters")
    .required("Name Topic is required"),

  detail: string()
    .trim() // ลบช่องว่างหน้า-หลัง
    .min(5, "Detail must be at least 5 characters")
    .max(10000, "Detail must be less than 10,000 characters")
    .required("Detail is required"),
});
