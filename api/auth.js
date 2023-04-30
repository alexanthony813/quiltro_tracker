import client from "./client";

const login = (username, phone_number) => client.post("/auth", { username, phone_number });

export default {
  login,
};
