import api from "./api"; // หรือ axios instance ที่คุณตั้งไว้

const getAllUsers = async () => {
  const res = await api.get("/user");
  return res.data;
};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e5ac807 (Edit name service and CRD not U)
=======
>>>>>>> 38642ad78cd08acf6b2ff37a30fa321128604915
const getUserById = async (id) => {
  return await api.get(`/user/${id}`);
};


<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 300d35e (Test react-chartjs2 update service mockup filtered dropdown table)
=======
>>>>>>> e5ac807 (Edit name service and CRD not U)
=======
>>>>>>> 38642ad78cd08acf6b2ff37a30fa321128604915
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
<<<<<<< HEAD
<<<<<<< HEAD
  getUserById,
=======
>>>>>>> 300d35e (Test react-chartjs2 update service mockup filtered dropdown table)
=======
  getUserById,
>>>>>>> e5ac807 (Edit name service and CRD not U)
=======
  getUserById,
>>>>>>> 38642ad78cd08acf6b2ff37a30fa321128604915
};

export default Uservervices;
