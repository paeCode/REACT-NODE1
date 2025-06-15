const express = require('express'); //สร้างตัวแปรexpress
const Quote = require('inspirational-quotes'); //สร้างตัวแปรexpress

const app = express(); //สร้างตัวแปรappเพื่อเรียกใช้express
const cors = require('cors');
app.use(cors());


//จากนั้นดึงตัวแปลapp
app.get('/',(req,res) =>{
    res.send(Quote.getQuote());
})

// เริ่มรัน Server
app.listen(5000, () => {
    console.log('Server started successfully on http://localhost:5000');
});