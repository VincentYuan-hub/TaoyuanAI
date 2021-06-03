const sourceType = [
  ['camera'],
  ['album'],
  ['camera', 'album']
]
const sizeType = [
  ['compressed']
]
const promisify = require('../../../../util/promisify')
const callFunction = promisify(wx.cloud.callFunction)
Page({
  data: {
    detectResult: [],
    access_token: '',
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],
    sizeTypeIndex: 0,
    sizeType: ['压缩'],
  },

  /**
   * 启动时获取token
   */
  onLoad() {
    callFunction({
      name: 'baiduAIToken'
    }).then(res => {
      console.log('baiduAIToken success', res)
      this.setData({
        access_token: res.result
      })
    }).catch(error => {
      console.log('baiduAIToken fail', error)
    })
  },
  /**
   * share的时候
   */
  onShareAppMessage() {
    return {
      title: '图片',
      path: 'page/component/pages/general/general'
    }
  },
  /**
   * 图片来源
   */
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  /**
   * 图片质量
   */
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  /**
   * 选择图片
   */
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: 0,
      success(res) {
        console.log('选择图片成功，', res)
        that.setData({
          imgPath: res.tempFilePaths[0]
        })
      }
    })
  },
  /**
   * 上传图片并检测
   */
  detectImg(e) {
    const that = this
    var imgPath = this.data.imgPath
    var access_token = this.data.access_token
    wx.getFileSystemManager().readFile({
      filePath: imgPath,
      encoding: 'base64',
      success(ans) {
        wx.showLoading({
          title: '识别中'
        })
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=' + access_token,
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            image: ans.data
          },
          success(_res) {
            that.setData({detectResult:_res.data.result})
            console.log('_res', _res)
            wx.hideLoading();
          },
          fail(_res) {
            wx.hideLoading();
            wx.showToast({ 
              icon: 'error',
              title: '请求出错',
            })
            console.log('_res err', _res)
          }
        })
      }
    })
  }

})