// registerModel.js
const db = require('../koneksi/config');

class m_regist {
  register(username, password, id_role, nik, user_image, callback) {
    const sql = 'INSERT INTO t_user (username, password, id_role, nik, user_image) VALUES (?, ?, ?, ?, ?)';
    const values = [username, password, id_role, nik, user_image];

    db.query(sql, values, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }
}

module.exports = m_regist;
