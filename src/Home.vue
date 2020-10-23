<template>
  <div id="home">
    <el-container>

    	<base-header :activeIndex="activeIndex"></base-header>

		  <router-view class="me-container"/>

			<base-footer v-show="footerShow"></base-footer>

		</el-container>

  </div>

</template>

<script>
//Vue组件的路径
import BaseFooter from '@/components/BaseFooter'
import BaseHeader from '@/views/BaseHeader'

export default {
  name: 'Home',
  data (){
  	return {
  			activeIndex: '/',//base-header组件 的参数
  			footerShow:true//base-footer组件 的 v-show命令参数，控制组件显示还是隐藏
  	}
  },
  //注册组件，header和footer，<base-header>标签才可以用
  components:{
  	'base-header':BaseHeader,
  	'base-footer':BaseFooter
  },
  //没看懂
  beforeRouteEnter (to, from, next){
  	 next(vm => {
    	vm.activeIndex = to.path
  	})
  },
  beforeRouteUpdate (to, from, next) {
	  if(to.path == '/'){
	  	this.footerShow = true
	  }else{
	  	this.footerShow = false
	  }
	  this.activeIndex = to.path
	  next()
	}
}
</script>

<style>

.me-container{
  margin: 100px auto 140px;
}
</style>
