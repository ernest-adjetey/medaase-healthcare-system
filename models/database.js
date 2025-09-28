const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database', 'healthcare.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id TEXT UNIQUE,
        full_name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        date_of_birth TEXT,
        gender TEXT,
        address TEXT,
        emergency_contact TEXT,
        medical_history TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        appointment_id TEXT UNIQUE,
        patient_id TEXT,
        doctor_name TEXT,
        department TEXT,
        appointment_date TEXT,
        appointment_time TEXT,
        status TEXT DEFAULT 'scheduled',
        symptoms TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('Database initialized successfully');
});

module.exports = db;
