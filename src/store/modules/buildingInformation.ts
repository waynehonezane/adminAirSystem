import { defineStore } from 'pinia'
import { reqBuildingInformation } from '@/api/buildingInformation'
import useUserStore from '@/store/modules/user'

let usebuildingInformationStore = defineStore('buildingInformation', {
  state() {
        return {
          buildingInformation: [],
        }
  },
  actions: {
    async getBuildingInfo() {
      const userStore = useUserStore()
      // 获取楼栋所需参数
      let allAdminAndBuilding = {
        "campusId": userStore.campusId,
        "pageNum": 1
      }
      // console.log("参数",allAdminAndBuilding)
      let result = await reqBuildingInformation(allAdminAndBuilding)
      // console.log("所有楼栋信息", result.data1)
      this.buildingInformation = result.data1
      // console.log("piana", this.buildingInformation)
    },
    getters: {
    
    },
  }
})

export default usebuildingInformationStore
