const mysql = require('mysql');

// Konfigurasi koneksi MySQL lokal
// const db = mysql.createConnection({
//   host: '192.168.44.51',
//   user: 'root',
//   password: 'root',
//   database: 'absensi'
// });


// Hosting
const db = mysql.createConnection({
  host: 'bizv2dkqajuck4tr1iao-mysql.services.clever-cloud.com',
  user: 'uc5bmnhixjf5rqkn',
  password: 'NJK4SrauAA3SDhq8l5DG',
  database: 'bizv2dkqajuck4tr1iao'
});


db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = db;

