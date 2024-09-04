const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const util = require('util');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const app = express();

const db = require('./modul/db');
app.use(bodyparser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }  
}));

// แสดงหน้าแรก
app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/logadmin',(req,res)=>{
  res.render('logadmin')
})
 
// เพิ่มผู้ใช้ใหม่
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO bdname (name, email) VALUES(?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) throw err;
    res.redirect('/index');
  });
});

// แสดงรายการผู้ใช้
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM bdname';
  db.query(query, (err, result) => {
    if (err) throw err;
   // console.log(result)
    res.render('users', { users: result });
  });
});

// แสดงแบบฟอร์มสำหรับแก้ไขผู้ใช้
app.get('/users/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM bdname WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.render('edit', { user: result[0] });
  });
});

// แก้ไขข้อมูลผู้ใช้
app.post('/users/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = 'UPDATE bdname SET name = ?, email = ? WHERE id = ?';
  db.query(query, [name, email, id], (err) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

// ลบผู้ใช้
app.get('/users/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM bdname WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

app.post('/logadmin',(req,res)=>{
  const username = req.body.username
  const password = req.body.password

  if(username === "admin123@gmail.com" && password === "12345678"){

    req.session.username =username
    req.session.password =password
    req.session.login =true
    res.redirect('/users')
  }else{
    res.status('404')
  }
})


app.listen(8080, () => {
  console.log("Server running on port 8080");
});
