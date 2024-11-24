import request from "@/utils/request"; // axios实例

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function getUserInfo() {
  return request({
    url: "/api/user/info",
    method: "get",
  });
}
