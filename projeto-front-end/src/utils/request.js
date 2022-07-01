import axios from "axios";

async function request(method, uri, param) {
  const BASE_URL = "http://localhost:3000";
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  switch (method.toLowerCase()) {
    case "get":
      try {
        let response;
        if (param) {
          response = await axios.get(`${BASE_URL}${uri}/${param}`, {
            headers: headers,
          });
        } else {
          response = await axios.get(`${BASE_URL}${uri}`, {
            headers: headers,
          });
        }
        const data = response.data;
        console.log(response);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
      break;
    case "post":
      try {
        const response = await axios.post(`${BASE_URL}${uri}`, param);
        const data = response.data;
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
      break;
    case "put":
      try {
        const response = await axios.put(`${BASE_URL}${uri}`, param);
        const data = response.data;
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
      break;
    case "delete":
      try {
        const response = await axios.delete(`${BASE_URL}${uri}/${param}`);
        const data = response.data;
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
      break;
    default:
      break;
  }
}

export default request;
