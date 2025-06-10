const express = require('express'); //สร้างตัวแปรexpress
const Quote = require('inspirational-quotes'); //สร้างตัวแปรexpress

const app = express(); //สร้างตัวแปรappเพื่อเรียกใช้express

//จากนั้นดึงตัวแปลapp
app.get('/',(req,res) =>{
    res.send(Quote.getQuote());
})

//ส่วนของSever
app.listen(5000,() =>{
    console.log('Sever started successfully!');
})