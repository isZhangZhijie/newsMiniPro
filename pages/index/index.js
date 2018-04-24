// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsKind: [
      { name: '头条', key: 'recommend', matchId: 'T1348647909107' },
      { name: '热点', key: 'hotspot', matchId: 'T1467284926140' },
      { name: '社会', key: 'society', matchId: 'T1348648037603' },
      { name: '娱乐', key: 'entertainment', matchId: 'T1348648517839'},
      { name: '时尚', key: 'fashion', matchId: 'T1348650593803' },
      { name: '军事', key: 'military', matchId: 'T1348648141035' },
      { name: '财经', key: 'finance', matchId: 'T1348648756099' },
      { name: '健康', key: 'health', matchId: 'T1414389941036' },
    ],
    selected: 'recommend',
    matchId: 'T1348647909107',
    newsContHeight: '',
    newsList: [],
    start: 0,
    end: 10,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var start = that.data.start;
    var end = that.data.end;
    wx.getSystemInfo({
      success: function(res) {
        var newsContHeight = res.windowHeight - 46;
        that.setData({ newsContHeight: newsContHeight})
      }
    }),    
    wx.request({
      url: 'http://c.m.163.com/nc/article/list/T1348647909107/0-10.html',
      success: function (res) {
        console.log(res);
        that.setData({ newsList: that.judgeDocid(res.data['T1348647909107']) });
        that.setData({ start: start + 10, end: end + 10 })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  // 左右滑动切换或点击切换
  selNews(obj) {
    var that = this;
    var kind = obj.detail.currentItemId
    that.setData({ selected: kind })
    var newsKind = that.data.newsKind;
    // 遍历newsKind获取相应内容的matchId
    newsKind.forEach((val) => {
      if (kind == val.key) {
        wx.request({
          url: 'http://c.m.163.com/nc/article/list/' + val.matchId + '/0-10.html',
          success: function (res) {
            console.log(that.judgeDocid(res.data[val.matchId]));
            that.setData({ newsList: that.judgeDocid(res.data[val.matchId]) });
            that.setData({ matchId: val.matchId })
          }
        })
      }
    })
  },
  // 判断docid是否有效
  judgeDocid(arr) {
    var newArr = [];
    arr.forEach((val) => {
      if(val.docid.indexOf('_') == -1) {
        newArr.push(val);
      }
    })
    return newArr;
  },

  selKind: function(e) {
    this.setData({duration: 0});
    console.log('点击', e);
    this.setData({selected: e.target.dataset.key})
    this.setData({ duration: 500 });
  },

  // 滑到底部加载新内容
  scrolltolower: function() {
    var that = this;
    var start = that.data.start + 10;
    var end = that.data.end + 10;
    var matchId = that.data.matchId;
    that.setData({ start: start, end: end })
    wx.request({
      url: 'http://c.m.163.com/nc/article/list/' + matchId + '/'+ start + '-'+ end + '.html',
      success: function (res) {
        console.log(res)
        var newsList = that.data.newsList;
        newsList = newsList.concat(that.judgeDocid(res.data[matchId]));
        that.setData({ newsList: newsList });
      }
    })
  },

  // 主页左右滑动时顶部标签改变
  change: function(e) {
    var that = this;
    that.setData({ start: 0, end: 10 })
    console.log('滑动', e);
    // 判断是否为用户滑动
    // if(e.detail.source == "touch") {
      // 获取滑到的种类
      that.selNews(e)
    // }
  },

})