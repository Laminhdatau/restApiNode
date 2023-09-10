const express = require('express');
const m_history = require('../models/m_history');

const getHistoryById = async (req, res) => {
  const id_user = req.params.id_user;
  console.log(id_user);

  try {
    const result = await m_history.getHistoryByIdAsync(id_user); // Anda perlu mengganti ini dengan metode asynchronous yang sesuai dari model Anda
    res.status(200).json(result);
  } catch (err) {
    console.error('Error while getting history:', err);
    res.status(500).json({ error: 'Gagal mengambil data history' });
  }
};

module.exports = { getHistoryById };
