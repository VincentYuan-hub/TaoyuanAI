// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    db.collection('config').get().then((res) => {
      console.log('res', res)
      resolve(res.data[0].value)
    }).catch((res) => {
      console.log('res err', res)
      reject(res)
    })
  })

}