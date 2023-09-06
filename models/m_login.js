const db = require('../koneksi/config');

const m_login = {
  login: (username, password, callback) => {
    const sql = 'SELECT * FROM t_user WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }
};

module.exports = m_login;
