const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const db = require("../config/connection");
const config = require("../config/config");
const authenticateToken = require("../middleware/auth");
const {
    validateRegistration,
    validateLogin,
    validateTask,
    handleValidationErrors
} = require("../middleware/validation");

// Test route for API
router.get("/test", (req, res) => {
    res.json({ message: "API route is working!" });
});

// User Registration
router.post("/register", validateRegistration, handleValidationErrors, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await db("SELECT id FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into database
        const result = await db(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: result.insertId,
                name,
                email
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// User Login
router.post("/login", validateLogin, handleValidationErrors, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const users = await db("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name
            },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const users = await db("SELECT id, name, email, created_at FROM users WHERE id = ?", [req.user.id]);

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Get all tasks for the authenticated user
router.get("/tasks", authenticateToken, async (req, res) => {
    try {
        const { status, priority, sortBy = 'created_at', order = 'DESC' } = req.query;

        let query = "SELECT * FROM tasks WHERE user_id = ?";
        let params = [req.user.id];

        // Add filters
        if (status) {
            query += " AND status = ?";
            params.push(status);
        }

        if (priority) {
            query += " AND priority = ?";
            params.push(priority);
        }

        // Add sorting
        const validSortFields = ['created_at', 'updated_at', 'due_date', 'title', 'status', 'priority'];
        const validOrder = ['ASC', 'DESC'];

        if (validSortFields.includes(sortBy) && validOrder.includes(order.toUpperCase())) {
            query += ` ORDER BY ${sortBy} ${order.toUpperCase()}`;
        }

        const tasks = await db(query, params);

        res.json({
            success: true,
            tasks
        });

    } catch (error) {
        console.error("Fetch tasks error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Create a new task
router.post("/tasks", authenticateToken, validateTask, handleValidationErrors, async (req, res) => {
    try {
        const { title, description, status = 'pending', priority = 'medium', due_date } = req.body;

        const result = await db(
            "INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)",
            [req.user.id, title, description, status, priority, due_date || null]
        );

        // Fetch the created task
        const newTask = await db("SELECT * FROM tasks WHERE id = ?", [result.insertId]);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: newTask[0]
        });

    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Get a specific task
router.get("/tasks/:id", authenticateToken, async (req, res) => {
    try {
        const taskId = req.params.id;

        const tasks = await db("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [taskId, req.user.id]);

        if (tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            task: tasks[0]
        });

    } catch (error) {
        console.error("Fetch task error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Update a task
router.put("/tasks/:id", authenticateToken, validateTask, handleValidationErrors, async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, status, priority, due_date } = req.body;

        // Check if task exists and belongs to user
        const existingTasks = await db("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [taskId, req.user.id]);

        if (existingTasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Update task
        await db(
            "UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?",
            [title, description, status, priority, due_date || null, taskId, req.user.id]
        );

        // Fetch updated task
        const updatedTask = await db("SELECT * FROM tasks WHERE id = ?", [taskId]);

        res.json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask[0]
        });

    } catch (error) {
        console.error("Update task error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Delete a task
router.delete("/tasks/:id", authenticateToken, async (req, res) => {
    try {
        const taskId = req.params.id;

        // Check if task exists and belongs to user
        const existingTasks = await db("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [taskId, req.user.id]);

        if (existingTasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Delete task
        await db("DELETE FROM tasks WHERE id = ? AND user_id = ?", [taskId, req.user.id]);

        res.json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// Export the router
module.exports = router;

