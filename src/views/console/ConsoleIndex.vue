<template>
  <el-container style="height: 500px; border: 1px solid #eee">

    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <!--        动态读取左侧菜单-->
      <el-menu :router=true :default-openeds=openeds><!-- 添加router属性  导航1 2默认展开-->
        <!--读取router中的配置,循环读取routes作为菜单栏的每个导航，取出index，submenu标签要有index属性，不然点击后会同时展开关闭或不能点击-->
<!--        <el-submenu v-for="(item,index) in $router.options.routes":index="index+''">-->
<!--          <template slot="title"><i class="el-icon-setting"></i>{{item.name}}</template>-->
<!--          &lt;!&ndash;循环读取导航的每个子菜单    <el-menu-item>标签中的index属性对应router中的path路径&ndash;&gt;-->
<!--          <el-menu-item v-for="(item2,index2) in item.children":index="item2.path" :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>-->
<!--          &lt;!&ndash;class属性为is-active时菜单是选中样式，用当前路由是否和当前子菜单的路由相同来判断 是否是选中状态&ndash;&gt;-->
<!--        </el-submenu>-->
<!--        <el-submenu index="0">-->
<!--          <template slot="title">首页</template>-->
<!--        </el-submenu>-->
        <el-submenu index="1">
          <template slot="title">博客管理</template>
          <el-menu-item index="/console/article">文章管理</el-menu-item>
          <el-menu-item index="/console/category">类别管理</el-menu-item>
          <el-menu-item index="/console/comment">评论管理</el-menu-item>
        </el-submenu>
<!--        <el-submenu index="2">-->
<!--          <template slot="title">账号管理</template>-->
<!--        </el-submenu>-->

      </el-menu>

    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>

  </el-container>
</template>

<script>
export default {
  name: "console",
  data() {
    return {
      openeds: ['1']
    }
  }
}
</script>

<style scoped>

</style>
