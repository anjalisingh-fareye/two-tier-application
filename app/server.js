const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root123",
    database: "appdb"
});

function connectDB() {
    db.connect((err) => {
        if (err) {
            console.log("MySQL not ready, retrying in 5 seconds...");
            setTimeout(connectDB, 5000);
            return;
        }

        console.log("Connected to MySQL!");
    });
}

connectDB();

app.get("/", (req, res) => {
    res.send("Two-Tier Docker Application is Running!");
});

app.get("/db", (req, res) => {
    db.query("SELECT NOW() AS time", (err, result) => {
        if (err) {
            return res.status(500).send("Database connection failed");
        }

        res.send(`Database Connected! Time: ${result[0].time}`);
    });
});

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
});
