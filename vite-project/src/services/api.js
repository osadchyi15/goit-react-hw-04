import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const MyApiKey = "9rll1EsqB868TxskpxLhEpKeCDpOf09J3GwAJDbNZuw";

export const fetchResponseData = async (clientQuery, page) => {
  const { data } = await axios.get(
    `/search/photos?client_id=${MyApiKey}&query=${clientQuery}&page=${page}`
  );
  return data;
};
