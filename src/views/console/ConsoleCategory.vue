<template>
  <div>  <!-- template下只能有一个根节点，都放在<div>里面 -->
    <h1>分类管理</h1>
    <div class="add-button">
      <el-button type="primary">新建</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        label="编号"-->
<!--        width="80">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="category_name"
        label="类别名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="category_description"
        label="类别简介"
        width="300">
      </el-table-column>
      <el-table-column
        prop="articles.length"
        label="文章数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="author"
        label="订阅数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="author"
        label="设置为付费专栏"
        width="120">
      </el-table-column>
      <el-table-column
        prop="author"
        label="前台是否显示"
        width="120">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">管理文章</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import {getAllCategorysDetail} from '@/api/category'

export default {
  methods: {
    getCategorys() {
      let that = this
      getAllCategorysDetail().then(data => {
        that.tableData = data.data
      }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '文章分类加载失败', showClose: true})
        }
      })
    }
  },

  data() {
    return {
      tableData: []
    }
  },
  created() {//加载数据
    this.getCategorys();
  }
}
</script>

<style>
.add-button {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 100px;
}
</style>
