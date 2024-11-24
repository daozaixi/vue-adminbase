import Mock from "mockjs";

// 模拟登录接口
Mock.mock("/api/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body);

  if (username === "admin" && password === "123456") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        token: "mock-token-" + Date.now(),
        userInfo: {
          username: "admin",
          nickname: "管理员",
          avatar: "https://example.com/avatar.jpg",
        },
      },
    };
  }

  return {
    code: 401,
    message: "用户名或密码错误",
  };
});
