import axios from "axios";
import { City, LoggedInUser, UserCityData } from "../types";

const baseUrl = "http://localhost:3004/api/users";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getUser = async (id: string) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const singIn = async (credentials) => {
  // TODO validation
  try {
    const res = await axios.post(baseUrl, credentials);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const addCity = async (id: string, city: City) => {
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, city);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const updateCities = async (id: string, cities: City[]) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, { cities });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default { getAll, getUser, singIn, addCity, updateCities };
