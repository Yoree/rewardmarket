import __config from './etc/config'

App({
  __config,
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;  
    wx.login({
      success:res=>{
       wx.request({
         url: that.__config.basePath +'/mp/wechat/oauth',
         data:{
           "code": res.code
         },
         method: "GET",
        success:res=>{
          console.log(res.data);
          that.__config.openid = res.data.openid;
          if(res.data.exist){
            wx.switchTab({
              url: './pages/login/index',
            })
          }else{
            // wx.redirectTo({
            //   url: 'index'
            // })
          }
        }
       })
      }
    })
  },
})
