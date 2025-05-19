import api from "../api";

const createYear = async (data) => {
  return await api.post("/users/year/", data);
};

const createYearAuto = async (data) => {
  return await api.post("/users/year/auto", data);
};

const getYears = async () => {
  return await api.get("/users/year/");
};

//params
const getYearById = async (year_id) => {
  return await api.get(`/users/year/${year_id}`);
};

const updateYear = async (data) => {
  return await api.put("/users/year/", data);
};

//body
const deleteYear = async (id) => {
  return await api.delete("/users/year", { data: { year_id: id } });
};


const YearServices = {
  createYear,
  createYearAuto,
  getYears,
  updateYear,
  deleteYear,
  getYearById,
};

export default YearServices;
