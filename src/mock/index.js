import Mock from "mockjs";

// 设置延迟和响应时间
Mock.setup({
  timeout: "200-600",
});

// 数据存储
function getLocalUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// 获取用户列表
Mock.mock("/api/users", "get", () => {
  return {
    code: 200,
    message: "获取用户列表成功",
    data: getLocalUsers(),
  };
});

// 添加用户
Mock.mock("/api/users", "post", (options) => {
  const users = getLocalUsers();
  const newUser = JSON.parse(options.body);

  newUser.id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  newUser.createTime = new Date().toLocaleDateString();

  users.push(newUser);
  saveUsers(users);

  return {
    code: 200,
    message: "添加用户成功",
    data: newUser,
  };
});

// 更新用户
Mock.mock(/\/api\/users\/\d+/, "put", (options) => {
  const users = getLocalUsers();
  const updatedUser = JSON.parse(options.body);
  const index = users.findIndex((u) => u.id === updatedUser.id);

  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
    return {
      code: 200,
      message: "更新用户成功",
      data: updatedUser,
    };
  }

  return {
    code: 404,
    message: "用户不存在",
  };
});

// 删除用户
Mock.mock(/\/api\/users\/\d+/, "delete", (options) => {
  const users = getLocalUsers();
  const id = parseInt(options.url.match(/\/api\/users\/(\d+)/)[1]);
  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    users.splice(index, 1);
    saveUsers(users);
    return {
      code: 200,
      message: "删除用户成功",
    };
  }

  return {
    code: 404,
    message: "用户不存在",
  };
});

// 模拟登录接口
Mock.mock("/api/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body);

  // 初始化测试用户数据
  if (!localStorage.getItem("users")) {
    const initialUsers = [
      {
        id: 1,
        username: "admin",
        email: "admin@example.com",
        mobile: "13800138000",
        role: "admin",
        status: true,
        createTime: "2024-03-14",
      },
      {
        id: 2,
        username: "test",
        email: "test@example.com",
        mobile: "13800138001",
        role: "user",
        status: true,
        createTime: "2024-03-19",
      },
      {
        id: 3,
        username: "user1",
        email: "user1@example.com",
        mobile: "13800138002",
        role: "user",
        status: false,
        createTime: "2024-03-25",
      },
      {
        id: 4,
        username: "manager",
        email: "manager@example.com",
        mobile: "13800138003",
        role: "admin",
        status: true,
        createTime: "2024-04-14",
      },
    ];
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }

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
