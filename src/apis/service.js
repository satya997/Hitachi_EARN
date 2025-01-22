import client, { URL, apiURL } from "../apis/client.js";
import catchError from "../utils/helper.js";
import axios from "axios";

export const login = async (formData) => {
  try {
    const response = await axios.post(`${URL}/login`, formData);
    return response.data;
  } catch (err) {
    return catchError(err);
  }
};

export const getAllCardApi = async () => {
  try {
    const response = await client("/api/projects/project/allprojectData");
    return response.data;
  } catch (error) {
    catchError(error);
  }
};

// http://103.204.95.212:4000/api/projects/PRJ_002
export const projectsByID = async (id) => {
  try {
    const response = await axios.get(`${apiURL}/projects/${id}`);
    return response.data;
  } catch (error) {
    catchError(error);
  }
};
