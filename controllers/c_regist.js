const multer = require('multer');
const path = require('path');
const fs = require('fs');
const m_regist = require('../models/m_regist');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const id_user = req.body.nik;
    if (!id_user) {
      return cb(new Error('id_user tidak ditemukan dalam data permintaan'));
    }
    console.log(id_user);

    const fileName = id_user;
    cb(null, fileName+".jpg");
  },
});

const upload = multer({ storage: storage });

const register = (req, res) => {
  upload.single('user_image')(req, res, (err) => { 
    if (err) {
      return res.status(500).json({ message: 'Gagal mengunggah gambar', status: 'error', data: null });
    }

    const { username, nama_lengkap, password, nik } = req.body;
    const user_image_path = req.file.filename;
    m_regist.register(username, nama_lengkap, password, nik, user_image_path, (err, id_user,hashedPassword) => {
      if (err) {
        res.status(500).json({ message: 'Gagal melakukan registrasi', status: 'error', data: null });
      } else {
        res.status(200).json(
          { message: 'Registrasi berhasil', 
            status: 'success', 
            data: 
              { 
                id_user: id_user,
                username: username,
                nama_lengkap: nama_lengkap,
                password: hashedPassword,
                nik: nik ,
                user_image:user_image_path
              } 
          }
        );
      }
    });
  });
};

module.exports = { register };
