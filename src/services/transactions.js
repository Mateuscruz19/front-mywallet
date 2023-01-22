import axios from "axios";

const url = process.env.REACT_APP_API_URL

export function createTransaction(body, type, token) {
  const transaction = {
    ...body,
    type,
  };

  const promisse = axios.post(`${url}/transactions`, transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
  return promisse;
}

export function findAllTransactions(token) {
  const promisse = axios.get(`${url}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
  return promisse;
}
