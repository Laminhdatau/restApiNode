const db = require('../koneksi/config');
const crypto = require('crypto');

const m_login = {
  login: (username, password, callback) => {
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
    const sql = 'SELECT * FROM t_user WHERE username = ? AND password = ?';
    const values = [username, hashedPassword];

    db.query(sql, values, (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      const user = results[0];
      if (user.id_role === 3) {
        return callback(null, user);
      } else {
        return callback(null, null);
      }
    });
  },
};

module.exports = m_login;
