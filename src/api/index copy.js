import axios from "axios";

export function getPokemonPageList(data) {
  console.log(` :::::::::::::::::::: api :::::::::::::::::::: data`);
  console.log(data);
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
  return axios.get(BASE_URL);
  // return axios.get("https://pokeapi.co/api/v2/pokemon/", data).then(res => res);
}
