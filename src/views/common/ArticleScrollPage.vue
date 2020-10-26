<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <article-item v-for="a in articles" :key="a.article_id" v-bind:article="a"></article-item>
  </scroll-page>
</template>

<script>
  import ArticleItem from '@/components/article/ArticleItem'
  import ScrollPage from '@/components/scrollpage'
  import {getArticles} from '@/api/article'

  export default {
    name: "ArticleScrollPage",
    props: {
      offset: {
        type: Number,
        default: 100
      },
      page: {
        type: Object,
        default() {
          return {}
        }
      },
      query: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    watch: {
      'query': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage.pageNumber = 1
          this.getArticles()
        },
        deep: true
      },
      'page': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage = this.page
          this.getArticles()
        },
        deep: true
      }
    },
    //html页面加载前，调用getArticles()方法
    created() {
      this.getArticles()
    },
    data() {
      return {
        loading: false,//是否正在加载，传入<scroll-page>，显示相应页面
        noData: false,//是否有文章数据，传入<scroll-page>，显示相应页面
        innerPage: {//用于分页
          pageSize: 5,
          pageNumber: 1,
          name: 'a.createDate',
          sort: 'desc'
        },
        articles: [] //查询到的文章数据，传入<ArticleItem>组件
      }
    },
    methods: {
      load() {
        this.getArticles()
      },
      view(id) {
        this.$router.push({path: `/view/${id}`})
      },
      //先不分页
      getArticles() {
        let that = this
        that.loading = true //正在加载标志位

        getArticles().then(data => {

          let newArticles = data.data
          if (newArticles && newArticles.length > 0) {
            that.articles = newArticles
          } else {
            that.noData = true
          }

        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }
        }).finally(() => {
          that.loading = false //正在加载标志位置false
        })

      }
      /*
      getArticles() {
        let that = this
        that.loading = true //正在加载标志位

        getArticles(that.query, that.innerPage).then(data => {

          let newArticles = data.data
          if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNumber += 1
            that.articles = that.articles.concat(newArticles)
          } else {
            that.noData = true
          }

        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }
        }).finally(() => {
          that.loading = false //正在加载标志位置false
        })

      }
      */
    },
    //注册Vue组件
    components: {
      'article-item': ArticleItem,
      'scroll-page': ScrollPage
    }

  }
</script>

<style scoped>
  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 10px;

  }
</style>
