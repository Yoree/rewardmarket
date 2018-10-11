const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startImg:'../../assert/images/start.png',
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.getSetting({
      success:res=>{
       
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:res=>{
              wx.switchTab({
                url: '../login/index',
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if(e.detail.userInfo){
      var that = this;
      console.log(e.detail.userInfo);
      wx.request({
        url: app.__config.basePath +'/mp/wechat/register',
        data:{
          openid: app.__config.openid,
          name: e.detail.userInfo.nickName,
          photo: e.detail.userInfo.avatarUrl,
        },
        header:{
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success:res=>{
         console.log(res);
        },
        fail:res=>{
          console.log("fail");
        }
      });
      wx.switchTab({
        url: '../login/index',
      })
    }else{
      wx.showModal({
        title: '警告',
        content: '你点击了拒绝授权，无法进入小程序，请授权之后再进入！！！',
        showCancel:false,
        confirmText:'返回授权',
        success:res=>{
          if(res.confirm){
            console.log('用户点击了“返回授权”');
          }
        }
      })
    }
  },
  // queryUsreInfo:function(){
  //   wx.request({
  //     url: app.__config.basePath + '/wechat/oauth/register',
  //     data:{
  //       openid :app.__config.openid
  //     },
  //     header:{
  //       'content-type': 'application/json'
  //     },
  //     success:res=>{
  //       console.log(res.data);
  //     }
  //   })
  // },
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