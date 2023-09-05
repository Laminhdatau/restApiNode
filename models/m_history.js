const db = require('../koneksi/config');

const m_history = {
  getAllHistory: (callback) => {
    const sql = "SELECT *, CONVERT_TZ(time_absen, 'UTC', 'Asia/Makassar') AS time_absen_makassar FROM v_absen";
    db.query(sql, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  },
};

module.exports = m_history;
