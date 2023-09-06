const mysql = require('mysql');

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
  host: '192.168.123.21',
  user: 'root',
  password: 'root',
  database: 'absensi'
});


db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = db;

