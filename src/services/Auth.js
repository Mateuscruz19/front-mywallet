import axios from "axios";

const url = process.env.REACT_APP_API_URL

export function signUp(body) {
  const response = axios.post(`${url}/sign-up`, body);
  return response;
}

export function signIn(body) {
  const response = axios.post(`${url}/sign-in`, body).catch((error) => {
    return error.response;
  });
  return response;
}
