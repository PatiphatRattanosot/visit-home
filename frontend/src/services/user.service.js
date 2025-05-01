import api from "./api"; // หรือ axios instance ที่คุณตั้งไว้

const getAllUsers = async () => {
  const res = await api.get("/user");
  return res.data;
};

<<<<<<< HEAD
const getUserById = async (id) => {
  return await api.get(`/user/${id}`);
};


=======
>>>>>>> 300d35e (Test react-chartjs2 update service mockup filtered dropdown table)
const addUser = async (data) => {
  return await api.post("/user", data);
}

const updateUser = async (id, data) => {
  return await api.put(`/user/${id}`, data);
}

 const deleteUser = async (id) => {
  const res = await api.delete(`/user/${id}`);
  return res.data;
};



const Uservervices = {
  deleteUser,
  getAllUsers,
  addUser,
  updateUser,
<<<<<<< HEAD
  getUserById,
=======
>>>>>>> 300d35e (Test react-chartjs2 update service mockup filtered dropdown table)
};

export default Uservervices;
