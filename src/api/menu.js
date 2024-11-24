import request from "@/utils/request"; // axios实例

export function getMenuList() {
  return request({
    url: "/menu",
    method: "get",
  });
}
