import axios from "axios";
import { BASE_URL } from "../constants/server_url";

export const getAllUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users/get-all-users`);
  const users = response.data.data;
  const fullName = users.map((name) => name.fullName);
  console.log("Memoir Users: ", fullName);
};
