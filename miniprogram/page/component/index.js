Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '小程序官方组件展示',
      path: 'page/component/index'
    }
  },

  data: {
    list: [
      {
        id: 'imagerecognition',
        name: '图像识别',
        open: false,
        pages: [
          { zh: '通用物体和场景识别', url: 'pages/general/general' },
          { zh: '品牌logo识别', url: 'pages/logo/logo' }
          // { zh: '植物识别', url: 'pages/plant/plant' },
          // { zh: '动物识别', url: 'pages/animal/animal' },
          // { zh: '菜品识别', url: 'pages/dish/dish' },
          // { zh: '地标识别', url: 'pages/landmark/landmark' },
          // { zh: '图像主体检测', url: 'pages/object_detect/object_detect' }
        ]
      }, {
        id: 'face',
        name: '人脸识别',
        open: false,
        pages: [
          // { zh: '人脸检测与属性分析', url: 'pages/face_detect/face_detect' }
        ]
      },{
        id: 'vehicle',
        name: '车辆分析',
        open: false,
        pages: [
          // { zh: '车辆检测', url: 'pages/vehicle_detect/vehicle_detect' }
        ]
      }, {
        id: 'imageprocess',
        name: '图像增强',
        open: false,
        pages:[
          // { zh: '翻拍识别', url: 'pages/recapture/recapture' },
          // { zh: '翻拍识别', url: 'pages/contrast_enhance/contrast_enhance' }
        ]
      }, {
        id: 'imagesearch',
        name: '图片搜索',
        open: false,
        pages:[
          // { zh: '相同图片搜索', url: 'pages/same/same' }
        ]
      }
    ],
    theme: 'light'
  },

  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  }
})
