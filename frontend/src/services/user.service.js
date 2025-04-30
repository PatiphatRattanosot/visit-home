import api from "./api"; // หรือ axios instance ที่คุณตั้งไว้

export const deleteUser = async (id) => {
  const res = await api.delete(`http://localhost:3000/user/${id}`);
  return res.data;
};

