import * as yup from "yup";

const onlyNumber = /^[0-9]+$/;

export const YearSchema = yup.object().shape({
    year: yup
        .string()
        .matches(onlyNumber, "กรุณากรอกปีการศึกษาให้ถูกต้อง")
        .min(4, "กรุณากรอกปีการศึกษาให้ถูกต้อง")
        .max(4, "กรุณากรอกปีการศึกษาให้ถูกต้อง")
        .required("กรุณากรอกปีการศึกษา"),
    
});