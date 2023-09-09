const db = require('../koneksi/config');

const m_lokasi = {
  getLocationById: (id_lokasi, callback) => {
    const sql = 'SELECT * FROM t_lokasi WHERE id_lokasi = ?';
    db.query(sql, [id_lokasi], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.length === 0) {
        callback(null, null);
      } else {
        const lokasiData = result[0];
        callback(null, lokasiData);
      }
    });
  },
};

module.exports = m_lokasi;
