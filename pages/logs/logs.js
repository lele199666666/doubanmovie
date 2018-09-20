//logs.js

Page({
  data: {
    logs: [],
    searchObj:[],
    inputMovie:''
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  },

  detail: function (e) {
    app.detail(e);
  }
})
