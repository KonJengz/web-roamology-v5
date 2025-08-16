import { string, object, date } from "yup";

export const schemaPost = object({
  countryName: string()
    .trim() // Remove whitespace
    .min(2, "Country name must be at least 2 characters")
    .max(100, "Country name must be less than 100 characters")
    .required("Country name is required"),

  placeName: string()
    .trim() // Remove whitespace
    .min(2, "Place name must be at least 2 characters")
    .max(100, "Place name must be less than 100 characters")
    .required("Place name is required"),

  zone: string()
    .trim() // Remove whitespace
    .max(100, "Zone must be less than 100 characters"),

  date: date()
    .typeError("Please enter a valid date") // Better error message
    .max(new Date(), "Date cannot be in the future") // Prevent future dates
    .nullable(),
});
