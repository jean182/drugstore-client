import API from "./axiosInstance";

export const fetchPrescriptionList = () => API.get("/prescriptions/");

export const addPrescription = prescription =>
  API.post("/prescriptions/", prescription);
