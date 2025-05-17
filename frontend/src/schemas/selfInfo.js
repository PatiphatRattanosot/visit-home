import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;
const phoneRule = /^\d+$/;
const latLngRegex = /^-?\d+(\.\d+)?$/;

export const SelfInfoSchema = yup.object().shape({
  father_prefix: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  father_first_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  father_last_name: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  father_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  father_job: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  mother_prefix: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  mother_first_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  mother_last_name: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  mother_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  mother_job: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  family_relation_status: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  parent_prefix: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  parent_first_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  parent_last_name: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  parent_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  parent_job: yup.string().matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย"),
  lat: yup.string().matches(latLngRegex, "กรุณากรอกเป็นตัวเลข"),
  lng: yup.string().matches(latLngRegex, "กรุณากรอกเป็นตัวเลข"),
});
