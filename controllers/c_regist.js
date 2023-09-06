
const m_regist = require('../models/m_regist'); 

const register = (req, res) => {
  const { username, password, id_role, nik } = req.body;


    m_regist.register(username, password, id_role, nik, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Gagal melakukan registrasi' });
      } else {
        res.status(200).json({ message: 'Registrasi berhasil' });
      }
    });
 };


module.exports = { register };
