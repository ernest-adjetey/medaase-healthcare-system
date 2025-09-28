const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models/database');
const appointmentRoutes = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'MedAse Healthcare System is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log('MedAse Healthcare System started on port ' + PORT);
    console.log('Frontend: http://localhost:' + PORT);
    console.log('API Health: http://localhost:' + PORT + '/api/health');
});
