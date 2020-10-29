<!--主页文章卡片-->
<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
<!--    文章header-->
    <div class="me-article-header">
<!--      标题-->
      <a @click="view(article.article_id)" class="me-article-title">{{article.article_title}}</a>
<!--      <el-button v-if="weight > 0" class="me-article-icon" type="text">置顶</el-button>-->
<!--      评论数 显示位置设置不知道在哪-->
      <span class="me-pull-right me-article-count">
	    	<i class="me-icon-comment"></i>&nbsp;{{article.article_commentcount}}
	    </span>
<!--      浏览量-->
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-view"></i>&nbsp;{{article.article_viewcount}}
	    </span>
    </div>
<!--    文章摘要-->
    <div class="me-artile-description">
      {{article.article_content}}
    </div>
<!--    文章footer-->
    <div class="me-article-footer">
<!--      用户名-->
<!--	  	<span class="me-article-author">-->
<!--	    	<i class="me-icon-author"></i>&nbsp;{{author.nickname}}-->
<!--	    </span>-->
<!--      标签-->
      <el-tag @click="tagOrCategory('tag', t.id)" v-for="t in article.tag" :key="t.tag_name" size="mini" type="success">{{t.tag_name}}</el-tag>
<!--      发布时间-->
      <span class="me-pull-right me-article-count">
	    	<i class="el-icon-time"></i>&nbsp;{{article.article_time | format}}
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
      article:Object
      // id: Number,
      // weight: Number,
      // title: String,
      // commentCounts: Number,
      // viewCounts: Number,
      // summary: String,
      // author: Object,
      // tags: Array,
      // createDate: String
    },
    data() {
      return {}
    },
    methods: {
      //看文章 路由转发
      view(id) {
        this.$router.push({path: `/view/${id}`})
      },
      //点击文章Tag标签，查看该标签下的所有文章
      tagOrCategory(type, id) {
        this.$router.push({path: `/${type}/${id}`})
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
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
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
