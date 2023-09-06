const db = require('../koneksi/config');
const crypto = require('crypto');

const m_login = {
  login: (username, password, callback) => {
    // Mengenkripsi kata sandi yang diberikan untuk mencocokkan dengan yang ada di database
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
    // Query untuk mencari pengguna berdasarkan username dan password
    const sql = 'SELECT * FROM t_user WHERE username = ? AND password = ?';
    const values = [username, hashedPassword];

    db.query(sql, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        // Pengguna tidak ditemukan
        return callback(null, null);
      }

      // Pengguna ditemukan, Anda dapat mengecek id_role di sini
      const user = results[0];
      // Contoh pengecekan id_role
      if (user.id_role === 1) {
        // Pengguna memiliki akses yang diperlukan
        return callback(null, user);
      } else {
        // Pengguna tidak memiliki akses yang diperlukan
        return callback(null, null);
      }
    });
  },
};

module.exports = m_login;
