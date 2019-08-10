// 封装一个插件
// 注册所有的components下的组件为全局组件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
// import MyTest from '@/components/my-test'
// vue暴露一个对象，对象中有一个选项
export default {
  install (Vue) {
    // 安装函数 当vue.use(使用插件) install被调用
    // vue 全局的vue对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
