const db = require('../koneksi/config');
const uuid = require('uuid');

const m_regist = {
  register: (username, password, id_role, nik, user_image, callback) => {
    const id_user = uuid.v4();
    const sql = 'INSERT INTO t_user (id_user, username, password, id_role, nik, user_image) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [id_user, username, password, id_role, nik, user_image];

    db.query(sql, values, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  },
};

module.exports = m_regist;
