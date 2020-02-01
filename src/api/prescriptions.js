import API from "./axiosInstance";

export const fetchPrescriptionList = () => API.get("/prescriptions/");

export const addPrescription = prescription =>
  API.post("/prescriptions/", prescription);

export const updatePrescription = prescription => {
  const { id } = prescription;
  return API.put(`/prescriptions/${id}`, prescription);
};

export const deletePrescriptionList = id => API.delete(`/prescriptions/${id}`);
