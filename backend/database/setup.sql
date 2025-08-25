-- Create the database and tables for the task management system

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS mern_task_db;

-- Use the database
USE mern_task_db;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- Insert some sample data for testing (optional)
INSERT INTO users (name, email, password) VALUES 
('John Doe', 'john@example.com', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa'); -- password: 'password123'

INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES 
(1, 'Complete project documentation', 'Write comprehensive documentation for the task management system', 'pending', 'high', '2025-08-30'),
(1, 'Code review', 'Review the authentication module code', 'in_progress', 'medium', '2025-08-28'),
(1, 'Setup deployment', 'Deploy the application to production server', 'pending', 'low', '2025-09-01');

-- Show tables and data
SHOW TABLES;
SELECT 'Users table:' as '';
SELECT * FROM users;
SELECT 'Tasks table:' as '';
SELECT * FROM tasks;
