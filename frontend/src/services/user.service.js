// api/userApi.js
import axios from "axios";

export const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/user");

    return res.data; // ส่งข้อมูลกลับไป
  } catch (err) {
    console.error("ไอสัส", err, "เชี่ยแล้วนะจ๊ะ");
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/user/${id}`);
    return res.data; // ส่งข้อมูลกลับไป
  } catch (err) {
    console.error("ไอสัส", err, "เชี่ยแล้วนะจ๊ะ");
  }
}
