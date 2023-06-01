import request from "@/utils/request";

export function getPokemonPageList(params) {
  const { page, row, first } = params;

  const offset = first ? 0 : row * (page - 1);
  const limit = first ? row * page : row;

  console.log(offset);
  console.log(limit);
  // url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1010",
  return request({
    url: "pokemon/",
    method: "get",
    params: {
      offset,
      limit,
    },
  });
}

export function getGenerationList() {
  // const { page } = params;
  // const generation = page;

  return request({
    url: "generation/",
    method: "get",
    params: {
      // generation
    },
  });
}
