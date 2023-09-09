const db = require('../koneksi/config');
const uuid = require('uuid');
const crypto = require('crypto'); 

const m_regist = {
  register: (username,nama_lengkap, password, nik, user_image_path, callback) => { 
    const id_user = uuid.v4();
    const id_role = '3';
    const id_biodata = uuid.v4();

    const biodataSql = 'INSERT INTO t_biodata (id_biodata, nama_lengkap, tgl_lahir, alamat, agama, jk, nik) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const biodataValues = [id_biodata, nama_lengkap, null, null,null, null, nik];

    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const userSql = 'INSERT INTO t_user (id_user, username, password, id_role, nik, user_image) VALUES (?, ?, ?, ?, ?, ?)';
    const userValues = [id_user, username, hashedPassword, id_role, nik, user_image_path];

    console.log(biodataValues);
    console.log(userValues);

    db.beginTransaction((err) => {
      if (err) {
        return callback(err, null);
      }

      db.query(biodataSql, biodataValues, (err, result) => {
        if (err) {
          db.rollback(() => {
            callback(err, null);
          });
          return;
        }

        db.query(userSql, userValues, (err, result) => {
          if (err) {
            db.rollback(() => {
              callback(err, null);
            });
            return;
          }

          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                callback(err, null);
              });
              return;
            }
            callback(null, id_user,hashedPassword);
          });
        });
      });
    });
  },
};

module.exports = m_regist;
