const express = require('express');
const m_regist = require('../models/m_regist'); // Gantilah dengan model yang sesuai

// Fungsi untuk menangani registrasi pengguna
const register = (req, res) => {
  const { username, password, id_role, nik } = req.body;
  const user_image = req.file.filename; // Ini akan menjadi nama file gambar yang akan disimpan di database

  const imagePath = path.join(__dirname, 'uploads', Date.now() + '-' + user_image.name);

  user_image.mv(imagePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
    
 
  m_regist.register(username, password, id_role, nik, imagePath, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Gagal melakukan registrasi' });
    } else {
      res.status(200).json({ message: 'Registrasi berhasil' });
    }
  });
  };

module.exports = { register };
