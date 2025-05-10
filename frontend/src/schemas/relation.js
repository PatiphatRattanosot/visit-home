import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F]+$/;

export const RelationSchema = yup.object().shape({
  family_member: yup
    .number()
    .min(1, "กรุณากรอกจำนวนให้ถูกต้อง")
    .integer("จำนวนสมาชิกไม่ควรเป็นทศนิยม")
    .required("กรุณากรอกจำนวนสมาชิกในครอบครัว"),
  family_time: yup
    .number()
    .min(0, "กรุณากรอกจำนวนชั่วโมงให้ถูกต้อง")
    .required("กรุณากรอกจำนวนชั่วโมงที่อยู่ร่วมกัน"),
  father_relation: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  mother_relation: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  brother_relation: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  sister_relation: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  grand_parent_relation: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  relatives_relation: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  other_relative: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  other_relation: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  when_student_alone: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  total_household_income: yup
    .number()
    .min(0, "กรุณากรอกจำนวนเงินให้ถูกต้อง")
    .required("กรุณากรอกรายได้ของครัวเรือน"),
  daily_total_to_school: yup
    .number()
    .min(0, "กรุณากรอกจำนวนเงินให้ถูกต้อง")
    .required("กรุณากรอกเงินค่าขนมที่ได้รับ"),
  received_daily_from: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  student_part_time: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  student_income: yup.number().min(0, "กรุณากรอกจำนวนเงินให้ถูกต้อง"),
  support_from_school: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  support_from_organize: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  parent_concern: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
});
