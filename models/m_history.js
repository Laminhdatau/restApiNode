const db = require('../koneksi/config');

const m_history = {
  getHistoryById: (id_user,callback) => {
    const sql = "SELECT *, CONVERT_TZ(time_absen, 'UTC', 'Asia/Makassar') AS time_absen_makassar FROM v_absen where id_user=?";
    db.query(sql, [id_user],(err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
      console.log(result);
    });
  },
};

module.exports = m_history;
