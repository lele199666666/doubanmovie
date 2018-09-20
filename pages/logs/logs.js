//logs.js
var util = require('../../utils/util.js')
var subjectUtill=require('../../utils/subjectUtil.js')
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
  outterTap:function(){
    console.log("你触发了outterTap")
  },
  middleTap: function () {
    console.log("你触发了middleTap")
  },
  innerTap: function () {
    console.log("你触发了innerTap")
  },
  bindinputLele:function(e){
    this.setData({
      inputMovie:e.detail.value
    })
  },
 searchLele:function(){
   var that=this
   if(that.data.inputMovie.trim()==""){
     wx.showModal({
       title: '温馨提示',
       content: '请输入查询内容',
       showCancel:false,
       fail:function(){
         that.setData({
           inputMovie:'请输入查询内容'
         })
       }
     })
     return;
   }
   wx.showToast({
    "title" : '正在加载中，请稍候',
     "icon":"loading",
     "duration":10000
   });
   var url = "https://douban.uieee.com/v2/movie/search?q=" + that.data.inputMovie;
   console.log("lele.url::"+url);
   wx.request({
     url: url,
     header:{
       "Content-Type": "application/json,application/json"
     },
     success:function(res){
       console.log(res)
       var subject=res.data.subjects;
       if (subject.length<1){
         that.setData({
           inputVal: "暂无相关内容！",
           movie: []
         });
         wx.hideToast();
         return;
       }
       subjectUtill.processSubjects(subject);
       that.setData({
         movie: subject
       });
       wx.hideToast();
     }
   })
 },
  detail: function (e) {
    app.detail(e);
  }
})
