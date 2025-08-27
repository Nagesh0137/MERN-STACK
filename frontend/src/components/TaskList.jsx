import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDate, getStatusColor, getPriorityColor, capitalize } from '../utils/helpers';

const TaskList = ({ tasks, loading, onEditTask }) => {
    const [deletingId, setDeletingId] = useState(null);
    const { deleteTask, updateTask } = useApp();

    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setDeletingId(taskId);
            try {
                await deleteTask(taskId);
            } catch (error) {
                console.error('Failed to delete task:', error);
            } finally {
                setDeletingId(null);
            }
        }
    };

    const handleStatusChange = async (task, newStatus) => {
        await updateTask(task.id, { ...task, status: newStatus });
    };

    if (loading) {
        return (
            <div className="task-list-container">
                <div className="loading-state">
                    <div className="loading-spinner">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <p className="loading-text">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="task-list-container">
                <div className="empty-state">
                    <div className="empty-icon">
                        <i className="bi bi-clipboard-check"></i>
                    </div>
                    <h5 className="empty-title">No tasks yet</h5>
                    <p className="empty-description">Create your first task to get started on your productivity journey.</p>
                    <div className="empty-illustration">
                        <div className="floating-cards">
                            <div className="card-float card-1"></div>
                            <div className="card-float card-2"></div>
                            <div className="card-float card-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list-container">
            <div className="task-grid">
                {tasks.map((task, index) => (
                    <div key={task.id} className={`task-card ${task.status} fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                        {/* Task Header */}
                        <div className="task-header">
                            <div className="task-status-indicator">
                                <button
                                    onClick={() => handleStatusChange(task, task.status === 'completed' ? 'pending' : 'completed')}
                                    className={`status-checkbox ${task.status === 'completed' ? 'completed' : ''}`}
                                    title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                                >
                                    {task.status === 'completed' && (
                                        <i className="bi bi-check2"></i>
                                    )}
                                </button>
                            </div>

                            <div className="task-badges">
                                <span className={`priority-badge priority-${task.priority}`}>
                                    <i className={`bi ${task.priority === 'high' ? 'bi-exclamation-triangle-fill' :
                                        task.priority === 'medium' ? 'bi-dash-circle-fill' : 'bi-circle-fill'}`}></i>
                                    {capitalize(task.priority)}
                                </span>
                                <span className={`status-badge status-${task.status.replace('_', '-')}`}>
                                    {capitalize(task.status.replace('_', ' '))}
                                </span>
                            </div>

                            <div className="task-actions">
                                <button
                                    onClick={() => onEditTask(task)}
                                    className="action-btn edit-btn"
                                    title="Edit task"
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    disabled={deletingId === task.id}
                                    className="action-btn delete-btn"
                                    title="Delete task"
                                >
                                    {deletingId === task.id ? (
                                        <div className="mini-spinner"></div>
                                    ) : (
                                        <i className="bi bi-trash"></i>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Task Content */}
                        <div className="task-content">
                            <h6 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
                                {task.title}
                            </h6>

                            {task.description && (
                                <p className="task-description">
                                    {task.description}
                                </p>
                            )}
                        </div>

                        {/* Task Footer */}
                        <div className="task-footer">
                            <div className="task-dates">
                                <div className="date-item">
                                    <i className="bi bi-calendar-plus"></i>
                                    <span>Created {formatDate(task.created_at)}</span>
                                </div>
                                {task.due_date && (
                                    <div className={`date-item due-date ${new Date(task.due_date) < new Date() && task.status !== 'completed'
                                            ? 'overdue'
                                            : ''
                                        }`}>
                                        <i className="bi bi-calendar-event"></i>
                                        <span>Due {formatDate(task.due_date)}</span>
                                        {new Date(task.due_date) < new Date() && task.status !== 'completed' && (
                                            <span className="overdue-badge">
                                                <i className="bi bi-exclamation-circle"></i>
                                                Overdue
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Progress indicator for in-progress tasks */}
                        {task.status === 'in_progress' && (
                            <div className="progress-indicator">
                                <div className="progress-bar"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
