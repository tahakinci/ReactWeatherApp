import axios from "axios";

const baseUrl = "http://localhost:3004/api/login";

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export default { login };
