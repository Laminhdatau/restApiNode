const mysql = require('mysql');

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
  host: '192.168.174.21',
  user: 'root',
  password: 'root',
  database: 'absensi'
});

// Koneksi ke MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = db;

