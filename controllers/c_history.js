// const express = require('express');
const m_history = require('../models/m_history'); 

const getAllHistory = (req, res) => {
  m_history.getAllHistory((err, result) => {
    if (err) {
      res.status(500).json({ error: 'Gagal mengambil data history' });
      return;
    }

    res.status(200).json(result);
  });
};

module.exports = { getAllHistory };
