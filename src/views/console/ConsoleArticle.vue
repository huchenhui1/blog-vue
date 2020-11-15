<template>
  <div>  <!-- template下只能有一个根节点，都放在<div>里面 -->
    <h1>文章管理</h1>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
<!--      fixed-->
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        label="编号"-->
<!--        width="80">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="article_title"
        label="标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="article_time"
        label="发布时间"
        width="250">
      </el-table-column>
      <el-table-column
        prop="article_viewcount"
        label="阅读数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="article_commentcount"
        label="评论数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="author"
        label="收藏数"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import {getArticles} from '@/api/article'

export default {
  methods: {
    getArticlesAll() {
      let that = this
      getArticles().then(data => {
        that.tableData = data.data
      }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '文章加载失败!', showClose: true})
        }
      })
    },
  },

  data() {
    return {
      tableData: []
    }
  },
  created() {//加载数据
    this.getArticlesAll();
  }
}
</script>
