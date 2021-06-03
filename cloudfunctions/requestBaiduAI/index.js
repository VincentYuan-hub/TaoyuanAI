// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
var request = require('request')
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event aaa', event)
  console.log(context)
  return new Promise((resolve, reject) => {
    db.collection('config').where({
    config_name: 'access_token'
    }).get().then((res)=>{
        console.log('res', res)
        var url = 'https://aip.baidubce.com/' + event.uri + '?access_token=' + res.data[0].value;
        console.log('url',url)
        return new Promise((resolve, reject) =>{
          request({
            url: url,
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
            },
            form: event.formData
          }, function (error, response, body) {
            if (!body.error_msg) {
              console.log('返还结果' + body)
              console.log('返还结果' + response)
              console.log('返还结果' + error)
              resolve({'status':'success',body:body})
            } else {
              reject({'status':'fail',body:error_msg})
            }
          })
        })
    })
  
  })
}