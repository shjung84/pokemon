import request from "@/utils/request";

// export function getPokemonPageList(data) {
//   const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
//   return axios.get(BASE_URL);
//   // return axios.get(BASE_URL, data).then(res => res);
//   // return axios.get("https://pokeapi.co/api/v2/pokemon/", data).then(res => res);
// }

export function getPokemonPageList(params) {
  const { page, row, first } = params;

  const offset = first ? 0 : row * (page - 1);
  const limit = first ? row * page : row;

  // url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1010",
  // url: "https://pokeapi.co/api/v2/",
  return request({
    url: "https://pokeapi.co/api/v2/pokemon/",
    method: "get",
    params: {
      offset,
      limit,
    },
  });
}

export function getGenerationList(params) {
  const { page, first } = params;

  // url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1010",
  // url: "https://pokeapi.co/api/v2/",
  return request({
    url: "https://pokeapi.co/api/v2/generation",
    method: "get",
    params: {
      page,
    },
  });
}
