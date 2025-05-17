import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;

export const FamilyStatusSchema = yup.object().shape({
  household_burdens: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  housing_type: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  housing_condition: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  family_vehicles: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  owned_land: yup.number().min(0, "จำนวนที่ดินไม่ควรตำกว่า 0"),
  rented_land: yup.number().min(0, "จำนวนที่ดินไม่ควรตำกว่า 0"),
});
