// component/fix/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    topValue: 10,
    leftValue:10
  },

  /**
   * 组件的方法列表
   */
  methods: {
    weizhi:function(){
      var that=this;
      wx.getSystemInfo({
        success: (res) => {
          var X=res.windowWidth-70;
          var Y=res.windowHeight-130;
          that.setData({
            leftValue:X,
            topValue:Y
          })
        },
      })
    }
  }
})
