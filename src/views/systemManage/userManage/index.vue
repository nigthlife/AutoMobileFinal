<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="tableHeight"
      ref="table"
    >
      <el-table-column prop="userId" label="用户id" align="center" width="auto">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名称"
        align="center"
        width="auto"
      >
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录名称"
        align="center"
        width="auto"
      >
      </el-table-column>
      <el-table-column
        prop="userPwd"
        label="用户密码"
        align="center"
        width="auto"
      >
      </el-table-column>
      <el-table-column label="日期" align="center" width="auto">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="loginState"
        label="登录状态"
        align="center"
        width="auto"
      >
      </el-table-column>
      <el-table-column
        prop="isDelete"
        label="是否删除"
        align="center"
        width="auto"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" width="auto">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  data() {
    return {
      tableData: [
        {
          userId: "1",
          userName: "神仙",
          loginName: "lsp",
          userPwd: "1234",
          createDate: "2016-05-04",
          loginState: "0",
          isDelete: "0",
        },
        {
          userId: "1",
          userName: "神仙",
          loginName: "lsp",
          userPwd: "1234",
          createDate: "2016-05-04",
          loginState: "0",
          isDelete: "0",
        },
        {
          userId: "1",
          userName: "神仙",
          loginName: "lsp",
          userPwd: "1234",
          createDate: "2016-05-04",
          loginState: "0",
          isDelete: "0",
        },
        {
          userId: "1",
          userName: "神仙",
          loginName: "lsp",
          userPwd: "1234",
          createDate: "2016-05-04",
          loginState: "0",
          isDelete: "0",
        },
      ],
      tableHeight: 50,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    calHeight() {
      this.$nextTick(() => {
        const rect = this.$refs.container.getBoundingClientRect();
        this.tableHeight = rect.height;
      });
    },
  },
  beforeCreate: function() {
      
  }
};
</script>

<style>
.header {
  flex-shrink: 0;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>