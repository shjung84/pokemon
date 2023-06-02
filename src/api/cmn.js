import request from "@/utils/request";

export function getGenerationList(data) {
  return request({
    url: "generation/",
    method: "get",
    data,
  });
}
