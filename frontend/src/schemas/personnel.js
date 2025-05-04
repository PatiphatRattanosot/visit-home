import * as yup from "yup";


const onlyThaiLang = /^[\u0E00-\u0E7F]+$/;
const phoneRule = /^\d+$/;


export const PersonnelSchema = yup.object().shape({
    prefix: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณาเลือกคำนำหน้า"),
    first_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกชื่อ"),
    last_name: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกนามสกุล"),
    user_id: yup
    .string()
    .matches(phoneRule, "กรุณากรอกเลขที่ประจำตัวบุคลากรให้ถูกต้อง")
    .required("กรุณากรอกเลขที่ประจำตัวบุคลากร"),
    rank: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณาเลือกตำแหน่ง"),
    phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณากรอกเบอร์โทรศัพท์"),
    status: yup
    .string()   
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณาเลือกสถานะ"),
})