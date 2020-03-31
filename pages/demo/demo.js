Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:'',
    array: [],
    cityname:'',
    index: 0,
    select: false,
    idArr:[],
    selectedId:'',
    tihuoWay: '广州',
    arrays: [{
      message: '浙江',
    }, {
      message: '江苏'
    }],
    imageArray: {
      mode: 'aspectFit',//保持纵横比缩放图片，使图片的长边能完全显示出来
      url:'../images/data.png', //字符串需要使用引号
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var th = this;
        var idList=[];
        wx.request({
          url: 'https://voice.cstor.cn:9798/zhp/app/qAccount',
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res.data.users)
            for (var i = 0; i < res.data.users.length;i++){
              idList.push(res.data.users[i].id)
            }
            th.setData({
              array: res.data.users,
              cityname: res.data.users[0].name,
              idArr: idList,
            })
          }
        })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value].name)
    this.setData({
      index: e.detail.value,
      cityname: this.data.array[e.detail.value].name,
    })
  },
  clickSaoma: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        that.show = "结果:" + res.result;
        that.setData({
          show: that.show
        })
          wx.showModal({
            title: '提示',
            content: '您当前所选用户：' + that.data.cityname,
            success(res) {
              console.log(that.data.cityname)
              console.log(that.data.idArr[that.data.index])
              if (res.confirm) {
                // 向后台发送请求
                wx.request({
                  //url: 'http://eqplatform.cstor.cn:9108/zhp/app/devInput',
                  url: 'https://voice.cstor.cn:9798/zhp/app/devInput',
                  method: 'POST',
                  header: { 'content-type': 'application/x-www-form-urlencoded' },
                  data: {
                    deviceCode: that.show,
                    ownedId: that.data.idArr[that.data.index]
                  },
                  success: function (res) {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => { }
    })
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false
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