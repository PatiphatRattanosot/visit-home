import api from "./api";

const sign = async (email) => {
  return await api.post(`/auth/sign`, email);
};

const AuthServices = {
  sign,
};

export default AuthServices;
