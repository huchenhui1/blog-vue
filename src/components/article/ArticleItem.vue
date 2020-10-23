<!--主页文章卡片-->
<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
<!--    文章header-->
    <div class="me-article-header">
<!--      标题-->
      <a @click="view(id)" class="me-article-title">{{title}}</a>
      <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button>
<!--      评论数 位置不知道在哪-->
      <span class="me-pull-right me-article-count">
	    	<i class="me-icon-comment"></i>&nbsp;{{commentCounts}}
	    </span>
<!--      浏览量-->
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-view"></i>&nbsp;{{viewCounts}}
	    </span>
    </div>
<!--    文章摘要-->
    <div class="me-artile-description">
      {{summary}}
    </div>
<!--    文章footer-->
    <div class="me-article-footer">
<!--      用户名-->
	  	<span class="me-article-author">
	    	<i class="me-icon-author"></i>&nbsp;{{author.nickname}}
	    </span>
<!--      标签-->
      <el-tag v-for="t in tags" :key="t.tagname" size="mini" type="success">{{t.tagname}}</el-tag>
<!--      发布时间-->
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-time"></i>&nbsp;{{createDate | format}}
	    </span>

    </div>
  </el-card>
</template>

<script>
  import { formatTime } from "../../utils/time";

  export default {
    name: 'ArticleItem',
    //从父组件ArticleScrollPage传入的参数
    props: {
      id: Number,
      weight: Number,
      title: String,
      commentCounts: Number,
      viewCounts: Number,
      summary: String,
      author: Object,
      tags: Array,
      createDate: String
    },
    data() {
      return {}
    },
    methods: {
      //看文章 路由转发
      view(id) {
        this.$router.push({path: `/view/${id}`})
      }
    }
  }
</script>

<style scoped>

  .me-article-header {
    /*padding: 10px 18px;*/
    padding-bottom: 10px;
  }

  .me-article-title {
    font-weight: 600;
  }

  .me-article-icon {
    padding: 3px 8px;
  }

  .me-article-count {
    color: #a6a6a6;
    padding-left: 14px;
    font-size: 13px;
  }

  .me-pull-right {
    float: right;
  }

  .me-artile-description {
    font-size: 13px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  .me-article-author {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
  }

  .el-tag {
    margin-left: 6px;
  }

</style>
