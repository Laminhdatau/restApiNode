const express = require('express');
const m_login = require('../models/m_login'); 
const login = (req, res) => {
  const { username, password } = req.body;

  m_login.login(username, password, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Gagal' });
    } else if (!user) {
      res.status(401).json({ error: 'Password salah' });
    } else {
      if (user.id_role === 3) {
        res.status(200).json({ message: 'Selamat datang', user });
      } else {
        res.status(403).json({ error: 'Akses ditolak' });
      }
    }
  });
};

module.exports = { login };
