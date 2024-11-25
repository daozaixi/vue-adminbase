<script setup>
  import { ref, onMounted } from "vue";
  import { Search, Plus, Delete, Edit, Lock } from "@element-plus/icons-vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { useUserStore } from "@/stores/user";
  const userStore = useUserStore();
  const searchKeyword = ref("");
  const userList = ref([]);
  const dialogVisible = ref(false);
  const formRef = ref(null);

  const userForm = ref({
    username: "",
    email: "",
    mobile: "",
    role: "user",
    status: true,
  });

  const rules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
    ],
    email: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
    ],
    mobile: [
      { required: true, message: "请输入手机号", trigger: "blur" },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ],
  };

  // 获取用户列表
  const getUserList = async () => {
    try {
      const res = await userStore.getUserList();
      userList.value = res;
    } catch (error) {
      console.error(error);
    }
  };

  // 添加用户
  const handleAdd = () => {
    userForm.value = {
      username: "",
      email: "",
      mobile: "",
      role: "user",
      status: true,
    };
    dialogVisible.value = true;
  };

  // 编辑用户
  const handleEdit = (row) => {
    userForm.value = { ...row };
    dialogVisible.value = true;
  };

  // 删除用户
  const handleDelete = async (id) => {
    try {
      await ElMessageBox.confirm("确认删除该用户?", "提示", {
        type: "warning",
      });
      await userStore.removeUser(id);
      ElMessage.success("删除成功");
      getUserList();
    } catch (error) {
      if (error !== "cancel") {
        ElMessage.error("删除失败");
      }
    }
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return;

    try {
      await formRef.value.validate();
      if (userForm.value.id) {
        await userStore.updateUserInfo(userForm.value.id, userForm.value);
        ElMessage.success("更新用户成功");
      } else {
        await userStore.addNewUser(userForm.value);
        ElMessage.success("添加用户成功");
      }
      dialogVisible.value = false;
      getUserList();
    } catch (error) {
      console.error(error);
    }
  };

  // 在组件挂载时获取用户列表
  onMounted(() => {
    getUserList();
  });
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="title">用户管理</h2>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入用户名/邮箱"
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" class="add-button" @click="handleAdd">
          <el-icon><Plus /></el-icon>添加用户
        </el-button>
      </div>
    </div>

    <el-card class="content-card">
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="mobile" label="手机号" width="120" />
        <el-table-column prop="role" label="角色" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-button type="danger" link @click="handleDelete(row.id)">
              <el-icon><Delete /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑用户对话框 -->
    <el-dialog
      :title="userForm.id ? '编辑用户' : '添加用户'"
      v-model="dialogVisible"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="userForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" style="width: 100%">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="userForm.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
  .container {
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 24px;
    color: #303133;
    margin: 0;
  }

  .toolbar {
    display: flex;
    gap: 16px;
  }

  .search-input {
    width: 300px;
  }

  .content-card {
    background: #fff;
    border-radius: 8px;
  }

  .add-button {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
</style>
