const nodemailer = require('nodemailer');

// Konfigurasi transporter (sesuaikan dengan penyedia email Anda)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'laminhdataulamin2@gmail.com', // Ganti dengan alamat email Anda
    pass: 'hcvvapktfwxsgomp' // Ganti dengan kata sandi email Anda
  }
});

// Buat objek email
const mailOptions = {
  from: 'laminhdataulamin2@gmail.com', // Alamat email pengirim
  to: 'dev.minjeey@gmail.com', // Alamat email penerima
  subject: 'TEST EMAIL',
  text: 'ANDA SUKSES.' // Isi pesan email Anda
};

// Kirim email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Error saat mengirim email: ' + error);
  } else {
    console.log('Email berhasil dikirim: ' + info.response);
  }
});
