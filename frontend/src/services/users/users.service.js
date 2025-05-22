import api from "../api";

const getAllUsers = async () => {
  return await api.get("/users");
};

const deleteUser = async (email) => {
  return await api.delete(`/users/${email}`);
};

const addAdminRole = async (email) => {
  return await api.patch(`/users/add/${email}`);
};

const removeAdminRole = async (email) => {
  return await api.patch(`/users/remove/${email}`);
};

const getAllTeacher = async () => {
  return await api.get("/users/teacher");
};


const getTeacherById = async (id) => {
    return await api.get(`/users/teacher/by_id/${id}`);
}

const addTeacher = async (data) => {
  return await api.post(`/users/teacher`, data);
};

const updateTeacher = async (data) => {
  return await api.put(`/users/teacher`, data);
};

const UsersServices = {
  getAllUsers,
  deleteUser,
  addAdminRole,
  removeAdminRole,
  addTeacher,
  updateTeacher,
  getTeacherById,
  getAllTeacher
};

export default UsersServices;
