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

// 模拟菜单接口
Mock.mock("/api/menu", "get", () => {
  return {
    code: 200,
    message: "获取菜单列表成功",
    data: [
      {
        id: 125,
        authName: "用户管理",
        path: "users",
        order: 1,
        children: [
          {
            id: 110,
            authName: "用户列表",
            path: "users",
            children: [],
            order: null,
          },
        ],
      },
      {
        id: 103,
        authName: "权限管理",
        path: "rights",
        order: 2,
        children: [
          {
            id: 111,
            authName: "角色列表",
            path: "roles",
            children: [],
            order: null,
          },
          {
            id: 112,
            authName: "权限列表",
            path: "rights",
            children: [],
            order: null,
          },
        ],
      },
      {
        id: 101,
        authName: "商品管理",
        path: "goods",
        order: 3,
        children: [
          {
            id: 113,
            authName: "商品列表",
            path: "goods",
            children: [],
            order: null,
          },
          {
            id: 114,
            authName: "分类管理",
            path: "categories",
            children: [],
            order: null,
          },
          {
            id: 115,
            authName: "参数管理",
            path: "params",
            children: [],
            order: null,
          },
        ],
      },
      {
        id: 102,
        authName: "订单管理",
        path: "orders",
        order: 4,
        children: [
          {
            id: 116,
            authName: "订单列表",
            path: "orders",
            children: [],
            order: null,
          },
        ],
      },
      {
        id: 145,
        authName: "数据统计",
        path: "reports",
        order: 5,
        children: [
          {
            id: 117,
            authName: "数据报表",
            path: "reports",
            children: [],
            order: null,
          },
        ],
      },
    ],
  };
});
