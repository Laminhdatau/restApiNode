const express = require('express');
const m_login = require('../models/m_login'); 
const login = (req, res) => {
  const { username, password } = req.body;

  m_login.login(username, password, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Gagal melakukan autentikasi' });
    } else if (!user) {
      res.status(401).json({ error: 'Kredensial salah' });
    } else {
      res.status(200).json({ message: 'Autentikasi berhasil', user });
    }
  });
};

module.exports = { login };
