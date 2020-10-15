// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../bmap-wx.js'); 
var wxMarkerData = []; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiceness:[
      {src:"../img/1.png",text:"张大姐烤肉饭"},
      {src:"../img/1.png",text:"张大姐烤肉饭"},
      {src:"../img/1.png",text:"张大姐烤肉饭"},
      {src:"../img/1.png",text:"张大姐烤肉饭"},
      {src:"../img/1.png",text:"张大姐烤肉饭"},
      {src:"../img/1.png",text:"张大姐烤肉饭"},
    ],
    Affordable:[
      {src:"../img/1.png",text:"张大姐烤肉饭",id:"1",num:"￥18",originalnum:"￥24"},
      {src:"../img/1.png",text:"张大姐烤肉饭",id:"2",num:"￥18",originalnum:"￥24"},
      {src:"../img/1.png",text:"张大姐烤肉饭",id:"3",num:"￥18",originalnum:"￥24"},
    ],
    Address:{
      ak:"5Gum5GZC942ZLm1vYH0tCGvVqNYtS2Tn",	//填写申请到的ak
      markers: [],
      longitude:'',	//经度
      latitude:'',	//纬度
      address:'',		//地址
      cityInfo:{},		//城市信息
      address_num:''   //显示字数
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象 
    var BMap = new bmap.BMapWX({ 
        ak: that.data.Address.ak 
    }); 
    var fail = function(data) { 
      console.log(data);
    }; 
    var success = function(data) { 
      //返回数据内，已经包含经纬度 
      console.log(data);
      //使用wxMarkerData获取数据
      wxMarkerData = data.wxMarkerData;  
      //把所有数据放在初始化data.Address内
      const address = `Address.address`,
      markers = `Address.markers`,
      latitude = `Address.latitude`,
      address_num='Address.address_num',
      longitude = `Address.longitude`,
      cityInfo = `Address.cityInfo`;
      that.setData({ 
        [markers]: wxMarkerData,
        [latitude]: wxMarkerData[0].latitude,
        [longitude]: wxMarkerData[0].longitude,
        [cityInfo]: data.originalData.result.addressComponent,
        [address]:wxMarkerData[0].address,
        [address_num]:wxMarkerData[0].address.length,
      }); 
    }  
    // 发起regeocoding检索请求 
    BMap.regeocoding({ 
      fail: fail, 
      success: success
    });     
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

  },

  /**
   * 用户点击地址更改地址
   */
  changeaddress:function () {
    var that=this;
    wx.chooseLocation({
      latitude: 0,
      success: (result) => {
        console.log(result);
        //把所有数据放在初始化data.Address内
        const address = `Address.address`,
        address_num='Address.address_num',
        latitude = `Address.latitude`,
        longitude = `Address.longitude`;
        that.setData({ 
          [latitude]: result.latitude,
          [longitude]: result.longitude,
          [address]:result.name,
          [address_num]:result.name.length,
        }); 
      }
    })
  },
})