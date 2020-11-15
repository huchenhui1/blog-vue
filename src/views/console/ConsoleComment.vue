<template>
  <div>  <!-- template下只能有一个根节点，都放在<div>里面 -->
    <h1>评论管理</h1>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="id"
        label="用户"
        width="150">
      </el-table-column>
      <el-table-column
        prop="id"
        label="评论文章"
        width="300">
      </el-table-column>
      <el-table-column
        prop="id"
        label="评论内容"
        width="300">
      </el-table-column>
      <el-table-column
        prop="id"
        label="评论时间"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button type="text">回复</el-button>
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
