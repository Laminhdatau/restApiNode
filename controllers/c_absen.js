const express = require('express');
const m_absen = require('../models/m_absen');
const { v4: uuidv4 } = require('uuid'); 
const moment = require('moment-timezone');


const createAbsen = (req, res) => {
  const {id_user,id_jenis_absen, id_lokasi } = req.body;

  if (!id_user || !id_jenis_absen || !id_lokasi) {
    res.status(400).json({ error: 'Data absen tidak lengkap' });
    return;
  }

  const id_absen = uuidv4();

  const newAbsen = {
    id_absen,
    id_user,
    id_jenis_absen,
    id_lokasi,
    time_absen: moment().tz('Asia/Makassar').format('YYYY-MM-DD HH:mm:ss')
  };

  m_absen.createAbsen(newAbsen, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Gagal menyimpan data absen' });
      return;
    }

    res.status(201).json({ message: 'Absen berhasil disimpan', data: newAbsen });
  });
};

module.exports = { createAbsen };
