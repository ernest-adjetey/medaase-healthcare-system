const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/', (req, res) => {
    const sql = `SELECT * FROM appointments ORDER BY appointment_date DESC`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ appointments: rows });
    });
});

router.post('/', (req, res) => {
    const { full_name, phone, email, department, appointment_date, appointment_time, symptoms } = req.body;
    const patient_id = 'PAT' + Date.now();
    const appointment_id = 'APT' + Date.now();

    const patientSql = `INSERT INTO patients (patient_id, full_name, phone, email) VALUES (?, ?, ?, ?)`;
    
    db.run(patientSql, [patient_id, full_name, phone, email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const appointmentSql = `INSERT INTO appointments 
            (appointment_id, patient_id, department, appointment_date, appointment_time, symptoms) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        
        db.run(appointmentSql, [appointment_id, patient_id, department, appointment_date, appointment_time, symptoms], 
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ 
                    success: true,
                    message: 'Appointment booked successfully',
                    appointment_id: appointment_id,
                    patient_id: patient_id
                });
            });
    });
});

router.get('/stats', (req, res) => {
    const sql = `
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
        FROM appointments
    `;
    
    db.get(sql, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ statistics: row });
    });
});

module.exports = router;
