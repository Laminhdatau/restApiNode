// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const m_regist = require('../models/m_regist');
// const sharp = require('sharp');

// const compressedDir = 'uploads/compressed'; 

// if (!fs.existsSync(compressedDir)) {
//   fs.mkdirSync(compressedDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const id_user = req.body.nik;
//     if (!id_user) {
//       return cb(new Error('id_user tidak ditemukan dalam data permintaan'));
//     }
//     console.log(id_user);

//     const fileName = id_user + '.jpg';
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

// const register = (req, res) => {
//   upload.single('user_image')(req, res, async (err) => { 
//     if (err) {
//       return res.status(500).json({ error: 'Gagal mengunggah gambar' });
//     }

//     const { username,nama_lengkap, password, nik } = req.body;
//     const user_image = req.file;

//     if (!user_image) {
//       return res.status(400).json({ error: 'Gambar tidak ditemukan cuy' });
//     }

//     const user_image_path = user_image.filename;
//     console.log(user_image_path);

//     try {
//       const compressedImagePath = path.join(compressedDir, user_image.filename);
//       await sharp(user_image.path)
//         .resize({ width: 500, height: 500 }) 
//         .jpeg({ quality: 50 })
//         .toFile(compressedImagePath);

//       m_regist.register(username, nama_lengkap,password, nik, user_image_path, (err, id_user) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: 'Gagal melakukan registrasi' });
//         } else {
//           res.status(200).json({ message: 'Registrasi berhasil', id_user: id_user });
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Gagal mengompres gambar' });
//     }
//   });
// };

// module.exports = { register };

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

    const fileName = id_user + '.jpg';
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const register = (req, res) => {
  upload.single('user_image')(req, res, (err) => { 
    if (err) {
      return res.status(500).json({ error: 'Gagal mengunggah gambar' });
    }

    const { username, nama_lengkap, password, nik } = req.body;
    const user_image_path = req.file.filename;
    console.log(user_image_path);

    m_regist.register(username, nama_lengkap, password, nik, user_image_path, (err, id_user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal melakukan registrasi' });
      } else {
        res.status(200).json({ message: 'Registrasi berhasil', id_user: id_user });
      }
    });
  });
};

module.exports = { register };

