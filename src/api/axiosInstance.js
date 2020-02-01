import axios from "axios";
import humps from "humps";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ],
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ]
});
