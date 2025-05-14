import api from "./api"; // หรือ axios instance ที่คุณตั้งไว้

const getAllUsers = async () => {
  const res = await api.get("/user");
  if (res.status === 200) {
    return res.data;
  }
};

const getUserById = async (id) => {
  return await api.get(`/user/${id}`);
};

const addUser = async (data) => {
  return await api.post("/user", data);
};

const updateUser = async (id, data) => {
  return await api.put(`/user/${id}`, data);
};

const deleteUser = async (email) => {
  const res = await api.delete(`/user/${email}`);
  return res;
};

const Uservervices = {
  deleteUser,
  getAllUsers,
  addUser,
  updateUser,
  getUserById,
};

export default Uservervices;
