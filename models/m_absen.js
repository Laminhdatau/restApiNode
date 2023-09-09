const db = require('../koneksi/config');
const uuid=require('uuid');

const m_absen = {
  createAbsen: (newAbsen, callback) => {
    const { id_user, id_jenis_absen, id_lokasi, time_absen } = newAbsen;

    const countAbsenMasukQuery = 'SELECT COUNT(*) AS jumlah_absen_masuk FROM t_absen WHERE id_user = ? AND id_jenis_absen = 1 AND DATE(time_absen) = CURDATE()';

    const countAbsenPulangQuery = 'SELECT COUNT(*) AS jumlah_absen_pulang FROM t_absen WHERE id_user = ? AND id_jenis_absen = 2 AND DATE(time_absen) = CURDATE()';

    db.query(countAbsenMasukQuery, [id_user], (masukErr, masukResult) => {
      if (masukErr) {
        callback(masukErr, null);
        return;
      }

      const jumlahAbsenMasuk = masukResult[0].jumlah_absen_masuk;

      db.query(countAbsenPulangQuery, [id_user], (pulangErr, pulangResult) => {
        if (pulangErr) {
          callback(pulangErr, null);
          return;
        }

        const jumlahAbsenPulang = pulangResult[0].jumlah_absen_pulang;

        if (id_jenis_absen === 1 && jumlahAbsenMasuk >= 1) {
          const error = new Error('Maaf, Anda sudah absen masuk hari ini...!!');
          callback(error, null);
          return;
        }

        if (id_jenis_absen === 2 && jumlahAbsenPulang >= 1) {
          const error = new Error('Maaf, Anda sudah absen pulang hari ini...!!');
          callback(error, null);
          return;
        }

        const insertQuery = 'INSERT INTO t_absen (id_absen,id_user, id_jenis_absen, id_lokasi, time_absen) VALUES (?,?, ?, ?, ?)';
        const id_absen = uuid.v4();

        const values = [id_absen,id_user, id_jenis_absen, id_lokasi, time_absen];

        db.query(insertQuery, values, (insertErr, insertResult) => {
          if (insertErr) {
            callback(insertErr, null);
            return;
          }
          callback(null, insertResult);
        });
      });
    });
  },
};

module.exports = m_absen;
