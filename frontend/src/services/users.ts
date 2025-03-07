import axios from "axios";
import { LoggedInUser, UserCityData } from "../types";

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

const updateCities = async (id: string, userObj: UserCityData) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, userObj);
    return res.data;
  } catch (error) {
    // TODO}
  }
};

// const addCity = async (id, city) => {
//   const user = `${baseUrl}/${id}`;
// };

export default { getAll, getUser, singIn, updateCities };
