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
    url: "/user/info",
    method: "get",
  });
}

export function getUsers() {
  return request({
    url: "/users",
    method: "get",
  });
}

export function addUser(data) {
  return request({
    url: "/users",
    method: "post",
    data,
  });
}

export function updateUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: "put",
    data,
  });
}

export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: "delete",
  });
}
