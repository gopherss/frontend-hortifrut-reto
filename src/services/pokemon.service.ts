import axios from "axios";

export const fetchPokemons = async (limit = 10, offset = 0) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

export const fetchPokemonByName = async (name: string) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${name}`);
  return response.data;
};
