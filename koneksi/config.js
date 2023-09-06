const mysql = require('mysql');

// Konfigurasi koneksi MySQL lokal
// const db = mysql.createConnection({
//   host: '192.168.123.21',
//   user: 'root',
//   password: 'root',
//   database: 'absensi'
// });


// Hosting
const db = mysql.createConnection({
  host: '172.18.0.1',
  user: 'id19981001_absensi',
  password: '@Absensi123',
  database: 'id19981001_absensi'
});


db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = db;

