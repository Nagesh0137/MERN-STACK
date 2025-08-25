const mysql = require("mysql2");
const util = require("util");
const config = require("./config");

const conn = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
});

// Test connection
conn.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database successfully!');
});

const exe = util.promisify(conn.query).bind(conn);

module.exports = exe;