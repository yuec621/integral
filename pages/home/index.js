// pages/policy/index.js
//获取应用实例
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoopingtext:'',
    navbarInitTop:0,
    isFixed:false,
    isFixedTop:false,
    navData:[
      {
       text: '最新资讯'
      },
      {
       text: '视频讲堂'
      },
      {
       text: '居住证积分'
      },
      {
       text: '居转户'
      },
      {
       text: '人才引进'
      }
     ],
     currentTab: 0,
     navScrollLeft: 0,
     imgUrls: [
      '/images/test/banner.png',
      '/images/test/banner.png',
      '/images/test/banner.png'
    ],
     indicatorDots: true,
     vertical: false,
     autoplay: true,
     interval: 2000,
     duration: 500,
     dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://www.xuenew.cn/site/xn.html',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      data: {
          key: 'value'
      },
      success:res=>{
        that.setData({
          dataList:res.data.data[0].con
        })
      }
    })
  },
  switchNav(event){
    var cur = event.currentTarget.dataset.current; 
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中       
    this.setData({
     navScrollLeft: (cur - 2) * singleNavWidth
    })  
    if (this.data.currentTab == cur) {
     return false;
    } else {
     this.setData({
      currentTab: cur
     })
    }
   },
   switchTab(event){
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
     currentTab: cur,
     navScrollLeft: (cur - 2) * singleNavWidth
    });
   },
  //搜索
  suo: function (e) {
    wx.navigateTo({
      url: '../search/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //获取当前组件到顶部的高度
  if(this.data.navbarInitTop == 0){
    wx.createSelectorQuery().select('#navbar').boundingClientRect((rect)=>{
      if(rect && rect.top>0){
        var navbarInitTop=parseInt(rect.top);
        this.data.navbarInitTop=navbarInitTop
      }
    }).exec();
  }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
// 监听页面滚动距离
onPageScroll: function(e) {
  var that = this;
  var scrollTop=parseInt(e.scrollTop);
  var isSatisfy=scrollTop >= that.data.navbarInitTop ;
  // if(that.data.isFixedTop === isSatisfy){
  //   return false;
  // }else{
    this.setData({
      isFixed:isSatisfy
    });
  // }
}

})