import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F]+$/;
const phoneRule = /^\d+$/;
const latLngRegex = /^-?\d+(\.\d+)?$/;

export const SelfInfoSchema = yup.object().shape({
  father_prefix: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณาเลือกคำนำหน้า"),
  father_first_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกชื่อของบิดา"),
  father_last_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกนามสกุลของบิดา"),
  father_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณากรอกเบอร์โทรศัพท์"),
  father_job: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกอาชีพของบิดา"),
  mother_prefix: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณาเลือกคำนำหน้า"),
  mother_first_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกชื่อของมารดา"),
  mother_last_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกนามสกุลของมารดา"),
  mother_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณากรอกเบอร์โทรศัพท์"),
  mother_job: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกอาชีพของมารดา"),
  family_relation_status: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณาเลือกคำตอบ"),
  parent_prefix: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณาเลือกคำนำหน้า"),
  parent_first_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกชื่อของผู้ปกครอง"),
  parent_last_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกนามสกุลของผู้ปกครอง"),
  parent_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณากรอกเบอร์โทรศัพท์"),
  parent_job: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกอาชีพของผู้ปกครอง"),
  lat: yup
    .string()
    .matches(latLngRegex, "กรุณากรอกเป็นตัวเลข")
    .required("กรุณากรอกตำแหน่งบ้าน"),
  lng: yup
    .string()
    .matches(latLngRegex, "กรุณากรอกเป็นตัวเลข")
    .required("กรุณากรอกตำแหน่งบ้าน"),
});
