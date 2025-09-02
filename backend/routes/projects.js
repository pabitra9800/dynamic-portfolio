const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get all projects (with optional tag filter)
router.get("/", (req, res) => {
  const tag = req.query.tag;

  if (tag) {
    db.query(
      `SELECT p.*, GROUP_CONCAT(t.tag) AS tags 
             FROM projects p 
             JOIN project_tags t ON p.id = t.project_id
             WHERE t.tag = ?
             GROUP BY p.id`,
      [tag],
      (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
      }
    );
  } else {
    db.query(
      `SELECT p.*, GROUP_CONCAT(t.tag) AS tags 
             FROM projects p 
             LEFT JOIN project_tags t ON p.id = t.project_id
             GROUP BY p.id`,
      (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(results);
      }
    );
  }
});

// Add a new project (Admin only)
router.post("/", auth, (req, res) => {
  const { title, description, image_url, github_link, live_link, tags } =
    req.body;

  db.query(
    "INSERT INTO projects (title, description, image_url, github_link, live_link) VALUES (?, ?, ?, ?, ?)",
    [title, description, image_url, github_link, live_link],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      const projectId = result.insertId;
      if (tags && tags.length > 0) {
        const tagValues = tags.map((tag) => [projectId, tag]);
        db.query("INSERT INTO project_tags (project_id, tag) VALUES ?", [
          tagValues,
        ]);
      }

      res.json({ message: "Project added successfully" });
    }
  );
});

// Update project (Admin only)
router.put("/:id", auth, (req, res) => {
  const { title, description, image_url, github_link, live_link, tags } =
    req.body;
  const projectId = req.params.id;

  db.query(
    "UPDATE projects SET title=?, description=?, image_url=?, github_link=?, live_link=? WHERE id=?",
    [title, description, image_url, github_link, live_link, projectId],
    (err) => {
      if (err) return res.status(500).json({ message: "Database error" });

      db.query(
        "DELETE FROM project_tags WHERE project_id=?",
        [projectId],
        () => {
          if (tags && tags.length > 0) {
            const tagValues = tags.map((tag) => [projectId, tag]);
            db.query("INSERT INTO project_tags (project_id, tag) VALUES ?", [
              tagValues,
            ]);
          }
        }
      );

      res.json({ message: "Project updated successfully" });
    }
  );
});

// Delete project (Admin only)
router.delete("/:id", auth, (req, res) => {
  db.query("DELETE FROM projects WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Project deleted successfully" });
  });
});

module.exports = router;
