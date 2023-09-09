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

    console.log("awallat "+ latitude);
    console.log("akhirlat "+ lokasiData.latitude);

    console.log("awalong "+longitude);
    console.log("akhirlong "+lokasiData.longitude);

    // Hitung jarak antara koordinat pengguna dan koordinat lokasi yang diharapkan
    const jarak = hitungJarak(latitude, longitude, lokasiKoordinat.latitude, lokasiKoordinat.longitude);
    console.log(jarak +" m");

    if (jarak <= 10) {
      // Pengguna dianggap dalam radius 10 meter dari lokasi yang diharapkan, lanjutkan dengan pengiriman data absen
      m_absen.createAbsen(newAbsen, (absenErr, result) => {
        if (absenErr) {
          console.log(absenErr);
          res.status(500).json({ error: 'Ups!! Gagal' });
          return;
        }

        res.status(201).json({ message: 'Horee!! Selamat Bekerja', data: newAbsen, locations: lokasiKoordinat });
      });
    } else {
      // Pengguna berada lebih dari 10 meter dari lokasi yang diharapkan, respon dengan pesan error
      res.status(400).json({ error: 'Anda harus berada kurang lebih 5 meter dari lokasi'+jarak });
    }
  });
};

// Fungsi untuk menghitung jarak antara dua koordinat geografis
const hitungJarak = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius Bumi dalam kilometer

  const keRadians = (derajat) => {
    return derajat * (Math.PI / 180);
  };

  const deltaLat = keRadians(lat2 - lat1);
  const deltaLon = keRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(keRadians(lat1)) * Math.cos(keRadians(lat2)) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const jarak = R * c * 1000; // Jarak dalam meter, langsung dikalikan dengan 1000
  return Math.round(jarak); // Hasil jarak dibulatkan ke bilangan bulat terdekat
};


module.exports = { createAbsen };
