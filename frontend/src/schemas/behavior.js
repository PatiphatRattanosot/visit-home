import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;

export const BehaviorSchema = yup.object().shape({
  health_risk: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  welfare_and_safety: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  distance_to_school: yup.number().min(0, "ระยะทางไม่ควรเป็นลบ"),
  time_used: yup.number().min(0, "เวลาเดินทางไม่ควรเป็นลบ"),
  school_transport: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  student_responsibilities: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  hobbies: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  drugs_behavior: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  violent_behavior: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  sexual_behavior: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  gaming_behavior: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  computer_internet_access: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  tech_use_behavior: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  information_giver: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
});
