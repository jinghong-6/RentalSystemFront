import { defineStore } from 'pinia'

const useStore = defineStore('searchInfo', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => ({

      // 所有这些属性都将自动推断出它们的类型
      Type:'',
      Value:''
  })
})

export default useStore