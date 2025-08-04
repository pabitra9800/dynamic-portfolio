// backend/controllers/portfolioController.js
const db = require('../config/db');
exports.getProjects = (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};