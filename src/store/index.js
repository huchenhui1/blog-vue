import Vuex from 'vuex'
import Vue from 'vue'
import {getToken, setToken, removeToken} from '@/request/token'
import {login, getUserInfo, logout, register} from '@/api/login'

Vue.use(Vuex);
/*
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
官方文档：https://vuex.vuejs.org/zh/guide
*/

//Store是仓库，在main.js 根实例中注册 store 选项
export default new Vuex.Store({
  //state是全局用的数据，在 Vue 组件中通过在计算属性中使用this.$store.state 获得 Vuex 状态
  state: {
    id: '',
    account: '',
    name: '',
    avatar: '',
    token: getToken(),
  },
  //set方法  store.commit('increment')
  //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation ， mutation 都是同步事务
  mutations: {
    //第二个参数是额外参数，即 mutation 的 载荷（payload）
    //使用mutation-types.js中的常量替代 Mutation 事件类型
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  },
  //Action 可以包含任意异步操作。
  //this.$store.dispatch：在vue组件中或router/index.js中分发Action
  actions: {
    //{ commit }使用 ES2015 的 参数解构 来简化代码，user是参数
    login({commit}, user) {
      //　Promise是ES6中的一个内置的对象，是为了解决异步问题。  (resolve, reject)箭头函数的两个参数名，没有函数名，Promise必须有resolve, reject
      return new Promise((resolve, reject) => {
        login(user.account, user.password).then(data => {
          //actions提交的是 mutation，而不是直接变更state。
          commit('SET_TOKEN', data.data['Oauth-Token'])//TOKEN存到store
          setToken(data.data['Oauth-Token'])//TOKEN存到localStorage
          //异步处理成功
          resolve()
          //
        }).catch(error => {
          //异步处理失败
          reject(error)
        })
      })
    },

    // 获取用户信息
    getUserInfo({commit, state}) {
      let that = this
      return new Promise((resolve, reject) => {
        //用login.js中的API方法
        getUserInfo().then(data => {
          //如果有返回数据
          if (data.data) {
            commit('SET_ACCOUNT', data.data.account)
            commit('SET_NAME', data.data.nickname)
            commit('SET_AVATAR', data.data.avatar)
            commit('SET_ID', data.data.id)
          } else {
            commit('SET_ACCOUNT', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            commit('SET_ID', '')
            //没返回用户信息，清除localStorage中的Token
            removeToken()
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(data => {
          //state和Token清空
          commit('SET_TOKEN', '')
          commit('SET_ACCOUNT', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_ID', '')
          removeToken()
          resolve()

        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出  Session超时
    fedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ACCOUNT', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ID', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        //调用注册API，后台数据返回Oauth-Token
        register(user.account, user.nickname, user.password).then((data) => {
          commit('SET_TOKEN', data.data['Oauth-Token'])
          setToken(data.data['Oauth-Token'])
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
})
