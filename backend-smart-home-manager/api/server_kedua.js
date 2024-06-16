// Buat post dengan fetch ke http://199.180.131.186/predict_combined

const analisis = async (data) => {
  return fetch('http://199.180.131.186/predict_combined', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(res => res.json()).catch(err => {
    throw err
  })
}

module.exports = {
  analisis
}
