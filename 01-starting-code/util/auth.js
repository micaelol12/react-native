import axios from "axios";

const API_KEY = "AIzaSyDzhhyucNA5nEKXQVvhKV9E2vaE7q9V8PY";

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
};

export const createUser = (email, password) => {
  return authenticate("signUp", email, password);
};

export const login = (email, password) => {
  return  authenticate("signInWithPassword", email, password);
};
