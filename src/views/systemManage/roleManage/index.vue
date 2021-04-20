<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="roleId"
      label="角色id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="角色描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="isEnable"
      label="是否删除"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          roleId: '1',
          roleName: '管理员',
          roleDesc: '权限管理',
          isEnable: '1',
        }, {
          roleId: '1',
          roleName: '管理员',
          roleDesc: '权限管理',
          isEnable: '1',
        }, {
          roleId: '1',
          roleName: '管理员',
          roleDesc: '权限管理',
          isEnable: '1',
        }, {
          roleId: '1',
          roleName: '管理员',
          roleDesc: '权限管理',
          isEnable: '1',
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style>

</style>