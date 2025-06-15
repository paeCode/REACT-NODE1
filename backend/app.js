const express = require('express');
const Quote = require('inspirational-quotes');
const cors = require('cors'); // เปิดใช้ cors

const app = express();

// เปิดใช้ CORS เพื่อให้ frontend เรียกใช้ API ได้
app.use(cors());

// Middleware สำหรับ parse JSON
app.use(express.json());

// Route หลักสำหรับดึง quote
app.get('/', (req, res) => {
    try {
        const quote = Quote.getQuote();
        res.json({
            success: true,
            data: quote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quote',
            error: error.message
        });
    }
});

// Route สำหรับดึง quote แบบสุ่ม
app.get('/api/quote', (req, res) => {
    try {
        const quote = Quote.getQuote();
        res.json({
            success: true,
            data: quote
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quote',
            error: error.message
        });
    }
});

// Route สำหรับดึง quote ตาม tag
app.get('/api/quote/:tag', (req, res) => {
    try {
        const tag = req.params.tag;
        const quote = Quote.getQuote({ tag: tag });
        res.json({
            success: true,
            data: quote,
            tag: tag
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetching quote for tag: ${req.params.tag}`,
            error: error.message
        });
    }
});

// Route สำหรับเช็คสถานะ server
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

// เริ่มรัน Server
app.listen(PORT, () => {
    console.log(`Server started successfully on http://localhost:${PORT}`);
    console.log(`Available routes:`);
    console.log(`- GET / : Get random quote`);
    console.log(`- GET /api/quote : Get random quote`);
    console.log(`- GET /api/quote/:tag : Get quote by tag`);
    console.log(`- GET /health : Check server status`);
});