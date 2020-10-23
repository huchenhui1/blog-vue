<!--footer组件-->

<template>
<!--  只有一个<el-footer>标签-->
  <el-footer class="me-area">
    <div class="me-footer">
<!--      底部的一行字和一个链接-->
      <p>Designed by
        <strong>
          <router-link to="/" class="me-login-design-color">ForFun</router-link>
        </strong>
      </p>
    </div>
  </el-footer>

</template>

<script>

  export default {
    name: 'BaseFooter',
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style>

  .el-footer {
    min-width: 100%;
    box-shadow: 0 -2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1024;
  }

  .me-footer {
    text-align: center;
    line-height: 60px;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;

  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

</style>
