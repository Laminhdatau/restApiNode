const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT | 3000;
const path = require('path');


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const c_history = require('./controllers/c_history');
const c_absen = require('./controllers/c_absen');
const c_regist = require('./controllers/c_regist');
const c_login = require('./controllers/c_login');

app.post('/register', c_regist.register);
app.post('/login', c_login.login);
app.get('/history', c_history.getAllHistory);
app.post('/absen', c_absen.createAbsen);


app.get('/get_image/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, 'uploads', imageName);
  res.sendFile(imagePath);
});

app.get('/',(req,res)=>{
  res.json({message:"Selamat Datang"});
})

app.listen(port, () => {
  console.log(`Server berjalan di Port ${port}`);
});
