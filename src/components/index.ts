import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入需要注册的全局组件
import svgIcon from './svgIcon/svgIcon.vue'

const allGloblComponent: any = { svgIcon }

export default {
  install(app: any) {
    Object.keys(allGloblComponent).forEach((key) => {
      app.component(key, allGloblComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
