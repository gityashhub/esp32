const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Allow CORS for ESP32 and frontend clients
app.use(cors());
app.use(express.json()); // In case you add JSON body handling later

// Dummy variable to simulate alert status
// 0: Safe, 1: Yellow Alert, 2: Red Alert
let alertStatus = 0;

// GET route for ESP32 to check current alert status
app.get('/api/alert', (req, res) => {
  res.send(alertStatus.toString()); // ESP expects plain number like "0", "1", or "2"
});

// POST route to update alert status (for testing via Postman or admin)
app.post('/api/alert/:status', (req, res) => {
  const newStatus = parseInt(req.params.status);
  if ([0, 1, 2].includes(newStatus)) {
    alertStatus = newStatus;
    res.send(`Alert status updated to ${alertStatus}`);
  } else {
    res.status(400).send('Invalid status. Use 0 (Safe), 1 (Yellow Alert), or 2 (Red Alert).');
  }
});

// Basic health check route
app.get('/', (req, res) => {
  res.send('🌊 Aqua Sentinel Alert Server is running...');
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
