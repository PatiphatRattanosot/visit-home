import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;

export const RelationSchema = yup.object().shape({
  family_member: yup
    .number()
    .min(1, "กรุณากรอกจำนวนให้ถูกต้อง")
    .integer("จำนวนสมาชิกไม่ควรเป็นทศนิยม"),
  family_time: yup.number().min(0, "กรุณากรอกจำนวนชั่วโมงให้ถูกต้อง"),
  father_relation: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  mother_relation: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  brother_relation: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  sister_relation: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  grand_parent_relation: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  relatives_relation: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  other_relative: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  other_relation: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  when_student_alone: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  total_household_income: yup.number().min(0, "กรุณากรอกจำนวนเงินให้ถูกต้อง"),
  daily_total_to_school: yup.number().min(0, "กรุณากรอกจำนวนเงินให้ถูกต้อง"),
  received_daily_from: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  student_part_time: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  student_income: yup.number().min(0, "กรุณากรอกจำนวนเงินให้ถูกต้อง"),
  support_from_school: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  support_from_organize: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  parent_concern: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
});
