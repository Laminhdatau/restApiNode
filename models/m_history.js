const db = require('../koneksi/config');

const m_history = {
  getHistoryByIdAsync: (id_user) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT *, CONVERT_TZ(time_absen, 'UTC', 'Asia/Makassar') AS time_absen_makassar FROM v_absen where id_user=? order by time_absen desc";
      db.query(sql, [id_user], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },
};

module.exports = m_history;
