// const express = require('express');
const m_history = require('../models/m_history'); 

const getHistoryById = (req, res) => {
  const id_user = req.params.id_user;
  console.log(id_user);

  m_history.getHistoryById(id_user, (err, result) => {
    if (err) {
      console.error('Error while getting history:', err);
      console.log(id_user);
      console.log(result);
      console.log(err)
      res.status(500).json({ error: 'Gagal mengambil data history' });
      return;
    }

    res.status(200).json(result);
  });
};
module.exports = { getHistoryById };
