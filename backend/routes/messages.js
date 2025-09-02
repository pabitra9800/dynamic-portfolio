// routes/messages.js
const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM messages ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json(results);
    }
  );
});

module.exports = router;
