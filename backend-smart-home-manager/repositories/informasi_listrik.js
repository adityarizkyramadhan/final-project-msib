const {
  InformasiListrik,
  PerangkatListrik,
} = require('../models');
const apiServerKedua = require('../api/server_kedua');

const library = {}
module.exports = library

library.create = async ({
  body = {},
  transaction = null
}) => {
  const informasiListrik = {
    daya: body.daya,
    jenis_pembayaran: body.jenis_pembayaran,
    user_id: body.user_id
  }
  const informasiListrikCreated = await InformasiListrik.create(informasiListrik, {
    transaction
  })

  const bodyRequest = {
    daya: body.daya,
    key: [],
  }

  const perangkatListriks = body.perangkat_listrik.map(perangkatListrik => {
    bodyRequest.key.push(perangkatListrik.jenis_perangkat)
    bodyRequest.key.push(perangkatListrik.jumlah.toString())
    bodyRequest.key.push(perangkatListrik.daya_listrik.toString())
    bodyRequest.key.push(perangkatListrik.lama_pemakaian.toString())
    bodyRequest.key.push(informasiListrik.user_id)
    return {
      jenis_perangkat: perangkatListrik.jenis_perangkat,
      jumlah: perangkatListrik.jumlah,
      daya_listrik: perangkatListrik.daya_listrik,
      lama_pemakaian: perangkatListrik.lama_pemakaian,
      user_id: informasiListrik.user_id
    }
  })

  const response = await apiServerKedua.analisis(bodyRequest)

  const perangkatListrikCreated = await PerangkatListrik.bulkCreate(perangkatListriks.map(perangkatListrik => ({
    ...perangkatListrik,
    informasi_listrik_id: informasiListrikCreated.id
  })), {
    transaction
  })
  const resultAnalisis = {
    total_kwh: `Total daya listrik yang kamu gunakan dalam sebulan adalah ${response[0].toLocaleString().replace(/,/g, '.')} kWh`,
    biaya: `Estimasi biaya listrik bulanan kamu saat ini adalah sekitar Rp ${response[1].toLocaleString().replace(/,/g, '.')} per bulan`,
    co2: `Estimasi emisi CO2 yang dihasilkan oleh perangkat listrik kamu adalah sekitar ${response[2].toLocaleString().replace(/,/g, '.')} kgCO2e per bulan`,
    informasi_listrik_id: informasiListrikCreated.id
  }

  return {
    informasiListrik: informasiListrikCreated,
    perangkatListrik: perangkatListrikCreated,
    response_ai: resultAnalisis
  }
}


library.checkIsComplete = async (user_id, transaction = null) => {
  const informasiListrik = await InformasiListrik.findOne({
    where: {
      user_id
    },
    transaction
  })

  if (!informasiListrik) {
    return false
  }

  const perangkatListrik = await PerangkatListrik.findAll({
    where: {
      user_id
    },
    transaction
  })

  if (perangkatListrik.length === 0) {
    return false
  }

  return true
}
