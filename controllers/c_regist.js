const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const m_regist = require('../models/m_regist');

const register = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Gagal mengunggah gambar' });
    }

    const { username, password, id_role, nik } = fields;
    const user_image = files.user_image;

    if (!user_image) {
      return res.status(400).json({ error: 'Gambar tidak ditemukan' });
    }

    const imagePath = path.join(__dirname, '../uploads', Date.now() + '-' + user_image.name);

    fs.rename(user_image.path, imagePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Gagal menyimpan gambar' });
      }

      m_regist.register(username, password, id_role, nik, imagePath, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Gagal melakukan registrasi' });
        } else {
          res.status(200).json({ message: 'Registrasi berhasil' });
        }
      });
    });
  });
};

module.exports = { register };
