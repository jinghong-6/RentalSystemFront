import { defineStore } from 'pinia'

const useStore = defineStore('OrderRoom', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => ({

      // 所有这些属性都将自动推断出它们的类型
      RoomImg:'',
      RoomTitle:'',
      RoomAddress:'',
      Price:'',
      Introduce:'',
      ConsumerId:'',
      ConsumerName:'',
      ConsumerTele:'',
      ConsumerBeginTime:'',
      ConsumerEndTime:'',
      ConsumerNum:'',
      LandlordId:'',
      LandlordImg:'',
      LandlordName:'',
      LandlordTele:'',
  })
})

export default useStore