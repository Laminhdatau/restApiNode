// const multer = require('multer');
// const path = require('path');
// const m_regist = require('../models/m_regist');


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// const register = (req, res) => {
//   upload.single('user_image')(req, res, (err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Gagal mengunggah gambar' });
//     }

//     const { username, password, id_role, nik } = req.body;
//     const user_image = req.file;
    
//     if (!user_image) {
//       return res.status(400).json({ error: 'Gambar tidak ditemukan' });
//     }
    
//     const user_image_path = user_image.filename;
//     console.log(user_image_path);

//     m_regist.register(username, password, id_role, nik, user_image_path, (err, result) => {
//       if (err) {
//         res.status(500).json({ error: 'Gagal melakukan registrasi' });
//       } else {
//         res.status(200).json({ message: 'Registrasi berhasil' });
//       }
//     });
//   });
// };

// module.exports = { register };



const multer = require('multer');
const path = require('path');
const m_regist = require('../models/m_regist');
const sharp = require('sharp'); // Import modul Sharp
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: async function (req, file, cb) {
    try {
      const id_user = await m_regist.register(nik); 
      const fileName = Date.now() + '-' + id_user + '-' + file.originalname;
      cb(null, fileName);
    } catch (err) {
      cb(err);
    }
  },
});


const upload = multer({ storage: storage });

const register = (req, res) => {
  upload.single('user_image')(req, res, async (err) => { // Gunakan async function
    if (err) {
      return res.status(500).json({ error: 'Gagal mengunggah gambar' });
    }

    const { username, password, id_role, nik } = req.body;
    const user_image = req.file;

    if (!user_image) {
      return res.status(400).json({ error: 'Gambar tidak ditemukan' });
    }

    const user_image_path = user_image.filename;
    console.log(user_image_path);

    // Menggunakan Sharp untuk mengompres gambar
    try {
      const compressedImagePath = path.join('uploads', 'compressed', user_image.filename);
      await sharp(user_image.path)
        .resize({ width: 800, height: 800 }) 
        .jpeg({ quality: 50 })
        .toFile(compressedImagePath);

      m_regist.register(username, password, id_role, nik, compressedImagePath, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Gagal melakukan registrasi' });
        } else {
          res.status(200).json({ message: 'Registrasi berhasil' });
        }
      });
      console.log(compressedImagePath);
    } catch (error) {
      res.status(500).json({ error: 'Gagal mengompres gambar' });
    }
  });
};


module.exports = { register };
