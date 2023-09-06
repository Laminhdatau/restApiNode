const db = require('../koneksi/config');
const uuid = require('uuid');

const m_regist = {
  register: (username, password, id_role, nik, callback) => {
    const id_user = uuid.v4();
    const sql = 'INSERT INTO t_user (id_user, username, password, id_role, nik) VALUES (?, ?, ?, ?, ?)';
    const values = [id_user, username, password, id_role, nik];

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
