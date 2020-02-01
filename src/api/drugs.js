import API from "./axiosInstance";

export const fetchDrugList = () => API.get("/drugs/");
