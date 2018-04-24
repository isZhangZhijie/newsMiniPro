// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://c.m.163.com/nc/article/' + options.id + '/full.html',
      success: function (res) {
        // console.log(res.data[options.id])
        var detail = res.data[options.id];
        var body = detail.body
        console.log(body);
        // 替换图片
        detail.img.forEach((val) => {
          body = body.replace(val.ref ,'<img src='+ val.src +'>')
        });
        // 替换视频
        if(detail.video) {
          detail.video.forEach((val, key) => {
            // console.log(val)
            // console.log(val.cover)
            body = body.replace("<!--VIDEO#" + key + "-->", '<video src="' + val.mp4Hd_url + '" poster="'+ val.cover +'">')
          });
        }
        // console.log(body)
        WxParse.wxParse('body', 'html', body, that, 15);
        that.setData({ detail: detail})
      }
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