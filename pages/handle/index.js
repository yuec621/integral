const { pickList } = require('../../data/pick.js');
// pages/handle/index.js
var jsonData=require('../../data/pick.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    //picker筛选
    multiArray: [],
    multiIndex: [0, 0],
  },
  // picker的功能
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var secondList = this.data.secondList;
    var select_key = e.detail.value[1];     //去二维数组中第二项的下标取出来，也就是二级下拉菜单的下标值
    this.setData({
      industryTwoId: secondList[select_key]['value']　　　　　　//  拿到下标值对应的value值就是我们要用的id
    })
  
    this.setData({
      multiIndex: e.detail.value   
    });
    // 通过triggerEvent绑定的myEvent方法，把一级下拉的id和二级下拉的id拿出来
    this.triggerEvent('myEvent', { industryOneId: this.data.industryOneId, industryTwoId: this.data.industryTwoId})
  },
  bindMultiPickerColumnChange: function (e) {
    let that = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: that.data.multiArray,
      multiIndex: that.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;  //从这以上的代码是案例自带的没有删除的。
/************************************************************/
    let industryOneId_session = that.data.industryOneId;   //  先将滚动前的一级菜单id存下来，便于之后做对比
    switch (e.detail.column) {
      case 0:
        let firstList = that.data.firstList;
        var firstId = firstList[e.detail.value]['value'];
        if (industryOneId_session != firstId) { //每次滚动的时候都去和上一个做一次对比
          that.searchClassInfo(firstId); // 只要不一样，就去执行上面searchClassInfo()这个方法
        }
        data.multiIndex[1] = 0;
        break;
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({
        success: function( res ) {
            that.setData( {
                winWidth: res.windowWidth,
                winHeight: res.windowHeight
            });
        }

    });



this.getInductry();

  },

  // 获取分类
  getInductry(){
    var that=this;
    var res=pickList
    console.log(res)
   let temporary={
    label:"请选择",
    value:"0",
    children:[{label:'',value:'0'}]  
   }
  let firstList=res.data;
  console.log(res.data,"数据")
  firstList.unshift(temporary);
  console.log(firstList);
  let industryName =firstList.map(m=>{
    return m.label
  });
  that.setData({
    multiArray: [industryName, []],      //----------- 将一级列表的名称存入二维数组的第一项
    firstList,                    // ------------一级的完整数据 先存着后面有用
    industryName                //---------------一级的名称 先存着后面有用
  });
  let industryOneId = firstList[0]['value'];  //  一级菜单默认的value
  // if (industryOneId) {
  //   that.searchClassInfo(industryOneId);  
  // }
  },

  searchClassInfo(value) {
    let that = this;
    if (value) {
      that.setData({
        industryOneId: value   //这个是一级列表中用户选中的value
      });
      that.data.firstList.map(m => {  //firstList是一级分类的数组，上方代码里有
        if (m.value == value) {  //通过比对查出value对应的这一列
          that.setData({
            secondList: m.children   //用户选中的一级分类中的children就是第二列的列表
          })
        }
      });
      // console.log(that.data.secondList);
      let industryTwoName = that.data.secondList.map(m => {
        return m.label    //再遍历secondList把所有的label取出来放入industryTwoName 中用于二级列表的展示
      });
      // console.log(industryTwoName);
      let industryName = that.data.industryName;
      that.setData({
        multiArray: [industryName, industryTwoName],  //这就是一个完整的二级联动展示了
        industryTwoName,
      })
    }
  },
  //  tab切换逻辑
  swichNav: function( e ) {
    var that = this;
    if( this.data.currentTab === e.target.dataset.current ) {
        return false;
    } else {
        that.setData({
            currentTab: e.target.dataset.current
        })
    }
},
bindChange: function( e ) {
    var that = this;
    that.setData( { currentTab: e.detail.current });

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

  }
})