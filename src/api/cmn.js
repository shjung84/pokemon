import request from "@/utils/request";

export function getGenerationList(data) {
  return request({
    url: "generation/",
    // url: "https://pokeapi.co/api/v2/generation/",
    method: "get",
    data,
  });
}
