const express = require('express');
const m_absen = require('../models/m_absen');
const m_lokasi = require('../models/m_lokasi');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');

const createAbsen = (req, res) => {
  const { id_user, id_jenis_absen, id_lokasi, latitude, longitude } = req.body;

  if (!id_user || !id_jenis_absen || !id_lokasi || !latitude || !longitude) {
    res.status(400).json({ error: 'Silahkan Ke Kantor Untuk Absensi' });
    return;
  }


  const time_absen = moment().tz('Asia/Makassar').format('YYYY-MM-DD HH:mm:ss');

  const newAbsen = {
    id_user,
    id_jenis_absen,
    id_lokasi,
    time_absen,
  };


  m_lokasi.getLocationById(id_lokasi, (lokasiErr, lokasiData) => {
    if (lokasiErr) {
      res.status(500).json({ error: 'Gagal mengambil data lokasi' });
      return;
    }

    if (!lokasiData) {
      res.status(404).json({ error: 'Data lokasi tidak ditemukan' });
      return;
    }

    const lokasiKoordinat = {
      latitude: lokasiData.latitude,
      longitude: lokasiData.longitude,
    };

    const koordinat=lokasiKoordinat.latitude +", "+ lokasiKoordinat.longitude;
    console.log(koordinat);

const nameLokasi = lokasiData.nama_lokasi;

  const locations={
    nameLokasi,
    koordinat
  }

    console.log(lokasiKoordinat.latitude);
    if (latitude === lokasiKoordinat.latitude && longitude === lokasiKoordinat.longitude) {
      m_absen.createAbsen(newAbsen, (absenErr, result) => {
        if (absenErr) {
          console.log(absenErr);
          res.status(500).json({ error: 'Ups!! Gagal' });
          return;
        }

        res.status(201).json({ message: 'Horee!! Selamat Bekerja', data: newAbsen,locations });
      });
    } else {
      res.status(400).json({ error: 'Anda tidak berada di lokasi yang sesuai' });
    }
  });
};

module.exports = { createAbsen};
