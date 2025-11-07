require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 4000;
const OWNER_EMAIL = process.env.OWNER_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'adminpass';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// -- API: create booking
app.post('/api/book', (req, res) => {
  const { name, eventType, eventDate, email, phone } = req.body;
  if(!name || !eventType || !eventDate || !email || !phone) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const stmt = db.prepare(`INSERT INTO bookings (name, eventType, eventDate, email, phone) VALUES (?, ?, ?, ?, ?)`);
  stmt.run([name, eventType, eventDate, email, phone], function(err) {
    if(err) return res.status(500).json({ error: err.message });
    const bookingId = this.lastID;

    // send email to owner with accept link
    const acceptUrl = `${BASE_URL}/api/bookings/${bookingId}/confirm?accept=true`;
    const rejectUrl = `${BASE_URL}/api/bookings/${bookingId}/confirm?accept=false`;

    const mail = {
      from: process.env.SMTP_USER,
      to: OWNER_EMAIL,
      subject: `New booking #${bookingId} - ${eventType}`,
      html: `
        <p>New booking from <strong>${name}</strong></p>
        <p>Event: ${eventType} — Date: ${eventDate}</p>
        <p>Contact: ${email} / ${phone}</p>
        <p>
          <a href="${acceptUrl}">Accept</a> | <a href="${rejectUrl}">Reject</a>
        </p>
      `
    };

    transporter.sendMail(mail, (err, info) => {
      if(err) {
        console.error('Email error', err);
      }
    });

    res.json({ success: true, id: bookingId });
  });
  stmt.finalize();
});

// -- API: list bookings (admin)
app.get('/api/bookings', (req, res) => {
  const { adminPassword } = req.query;
  if(adminPassword !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });

  db.all(`SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200`, (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// -- API: confirm/reject booking via owner link (public GET)
app.get('/api/bookings/:id/confirm', (req, res) => {
  const id = req.params.id;
  const accept = req.query.accept === 'true';

  const newStatus = accept ? 'confirmed' : 'rejected';
  db.run(`UPDATE bookings SET status = ? WHERE id = ?`, [newStatus, id], function(err) {
    if(err) return res.status(500).send('Server error');

    // fetch booking to send email to customer
    db.get(`SELECT * FROM bookings WHERE id = ?`, [id], (err, row) => {
      if(err || !row) return res.status(500).send('Cannot find booking');

      const mail = {
        from: process.env.SMTP_USER,
        to: row.email,
        subject: `Your booking #${id} is ${newStatus}`,
        html: `
          <p>Hi ${row.name},</p>
          <p>Your booking for <strong>${row.eventType}</strong> on ${row.eventDate} has been <strong>${newStatus}</strong>.</p>
          <p>We will contact you at ${row.phone} for further details.</p>
        `
      };

      transporter.sendMail(mail, (err, info) => {
        if(err) console.error('Email to customer failed', err);
      });

      // Simple confirmation web page
      res.send(`<h2>Booking #${id} ${newStatus}</h2><p>You may now close this window.</p>`);
    });
  });
});

// -- API: admin confirm via API (secure)
app.put('/api/bookings/:id/confirm', (req, res) => {
  const id = req.params.id;
  const { confirm, adminPassword } = req.body;
  if(adminPassword !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });

  const newStatus = confirm ? 'confirmed' : 'rejected';
  db.run(`UPDATE bookings SET status = ? WHERE id = ?`, [newStatus, id], function(err) {
    if(err) return res.status(500).json({ error: err.message });

    db.get(`SELECT * FROM bookings WHERE id = ?`, [id], (err, row) => {
      if(err || !row) return res.status(500).json({ error: 'Booking not found' });

      const mail = {
        from: process.env.SMTP_USER,
        to: row.email,
        subject: `Your booking #${id} is ${newStatus}`,
        html: `<p>Hi ${row.name}, your booking has been <strong>${newStatus}</strong>.</p>`
      };
      transporter.sendMail(mail, (err, info) => {
        if (err) {
            console.error("Customer email error:", err);
        } else {
            console.log("Customer email sent ✅:", info.response);
        }
    });

      res.json({ success: true, status: newStatus });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
