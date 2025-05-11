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

const updateYear = async (year_id,data) => {
  return await api.put("/users/year/", year_id, data);
};

const deleteYear = async (year_id) => {
  return await api.delete("/users/year/", year_id);
};

const YearServices = {
  createYear,
  createYearAuto,
  getYears,
  updateYear,
  deleteYear
};

export default YearServices;
