import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.params = {
  client_id: "JJvTNDjPkTWyfjui2lP582ISzNksza7bo01kKJ6JWwY",
  orientation: "landscape",
  per_page: 12,
};

export const requestImages = async (query, page) => {
  const { data } = await axios.get(`search/photos?query=${query}&page=${page}`);
  return data;
};
