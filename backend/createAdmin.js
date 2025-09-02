const bcrypt = require("bcrypt");
const db = require("./config/db"); // Your MySQL connection file

const username = "admin"; // Change if needed
const plainPassword = "admin123"; // Change to a strong password

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, hash], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        console.log("⚠ Admin already exists.");
      } else {
        throw err;
      }
    } else {
      console.log("✅ Admin user created successfully!");
    }
    process.exit();
  });
});
