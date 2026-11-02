const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Ensure uploads directory exists for Music Room local audio files
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Simple health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'UNIVERGAME', timestamp: new Date() });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`UNIVERGAME server running at http://localhost:${PORT}`);
});
