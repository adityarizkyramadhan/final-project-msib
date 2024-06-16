const firebaseAdmin = require('firebase-admin')
const googleService = require('../env/firebaseconfig.json')

const firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(googleService),
})


const sendNotif = async (fcmToken, title, body) => {
  const tokens = []
  tokens.push(fcmToken)
  console.log(fcmToken)
  return firebaseApp.messaging().sendEachForMulticast({
      notification: {
          title: title,
          body: body,
      },
      tokens: tokens
  }
  ).then(function (dataSend) {
      console.log(dataSend)
      return dataSend
  }).catch(function (err) {
      console.log(err)
      return null
  })
}

module.exports = {
  sendNotif
}
