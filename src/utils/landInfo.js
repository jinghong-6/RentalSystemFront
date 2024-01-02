import { defineStore } from 'pinia'

const useStore = defineStore('landlord', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => ({

      // 所有这些属性都将自动推断出它们的类型
      landId:'',
      landTele:'',
      landPwd:'',
      landName:'',
      landQq:'',
      landWechat:'',
      landProvince:'',
      landCounty:'',
      landStatus:'',
      landMoney:'',
      landLoginStatus:'',
      landRegisterTime:'',
      landImgUrl:'',
      landAddress:'',
      landIntroduce:''
  })
})

export default useStore