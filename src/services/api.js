import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchResponseData = async (parameters) => {
  const { data } = await axios.get(`/search/photos?`, {
    params: {
      client_id: "9rll1EsqB868TxskpxLhEpKeCDpOf09J3GwAJDbNZuw",
      orientation: "landscape",
      ...parameters,
    },
  });
  return data;
};
