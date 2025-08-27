import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { getGreeting, formatDate } from '../utils/helpers';
import TaskModal from './TaskModal';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';

const Dashboard = () => {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const {
        user,
        tasks,
        tasksLoading,
        tasksError,
        logout,
        fetchTasks,
        filter,
        setFilter,
        sort,
        setSort
    } = useApp();

    useEffect(() => {
        fetchTasks();
    }, [filter, sort]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowTaskModal(true);
    };

    const handleCloseModal = () => {
        setShowTaskModal(false);
        setEditingTask(null);
    };

    const getTaskStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.status === 'completed').length;
        const pending = tasks.filter(task => task.status === 'pending').length;
        const inProgress = tasks.filter(task => task.status === 'in_progress').length;
        const overdue = tasks.filter(task => {
            if (!task.due_date) return false;
            return new Date(task.due_date) < new Date() && task.status !== 'completed';
        }).length;

        return { total, completed, pending, inProgress, overdue };
    };

    const getCompletionPercentage = () => {
        const { total, completed } = getTaskStats();
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    const stats = getTaskStats();

    return (
        <div className="dashboard-container">
            {/* Modern Gradient Header */}
            <div className="dashboard-header">
                <div className="header-background"></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg navbar-dark">
                                <div className="container-fluid px-0">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <div className="header-content">
                                            <div className="greeting-section">
                                                <h1 className="greeting-title">
                                                    {getGreeting()}, {user?.name}! 👋
                                                </h1>
                                                <p className="greeting-subtitle">
                                                    {currentTime.toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                                <p className="current-time">
                                                    {currentTime.toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="header-actions">
                                            <button
                                                onClick={() => setShowTaskModal(true)}
                                                className="btn btn-new-task"
                                            >
                                                <i className="bi bi-plus-circle me-2"></i>
                                                <span className="d-none d-sm-inline">Create New Task</span>
                                                <span className="d-sm-none">New</span>
                                            </button>
                                            <div className="dropdown ms-3 user-dropdown-container">
                                                <button className="btn btn-user-menu dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <div className="user-avatar">
                                                        {user?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    {/* <span className="d-none d-md-inline ms-2">{user?.name}</span> */}
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end user-dropdown">
                                                    <li className="dropdown-item-text">
                                                        <div className="user-info">
                                                            <div className="user-name">{user?.name}</div>
                                                            <div className="user-email">{user?.email}</div>
                                                        </div>
                                                    </li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li>
                                                        <button
                                                            onClick={logout}
                                                            className="dropdown-item logout-btn"
                                                        >
                                                            <i className="bi bi-box-arrow-right me-2"></i>
                                                            Sign out
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <main className="dashboard-main">
                <div className="container-fluid">
                    {/* Modern Stats Cards */}
                    <div className="stats-section fade-in-up pt-3">
                        <div className="row g-4">
                            {/* Progress Overview Card */}
                            <div className="col-lg-4 col-md-6">
                                <div className="stats-card progress-card bounce-in">
                                    <div className="card-header">
                                        <h5 className="card-title">
                                            <i className="bi bi-graph-up"></i>
                                            Progress Overview
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="progress-circle">
                                            <div className="circle-chart" style={{
                                                background: `conic-gradient(#4f46e5 0deg ${getCompletionPercentage() * 3.6}deg, #e5e7eb ${getCompletionPercentage() * 3.6}deg 360deg)`
                                            }}>
                                                <div className="circle-inner">
                                                    <span className="progress-percentage">{getCompletionPercentage()}%</span>
                                                    <span className="progress-label">Complete</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress-stats">
                                            <div className="stat-item">
                                                <span className="stat-value">{stats.completed}</span>
                                                <span className="stat-label">Completed</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="stat-value">{stats.total}</span>
                                                <span className="stat-label">Total Tasks</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="col-lg-8 col-md-6">
                                <div className="row g-3">
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="stats-card metric-card pending-card fade-in-up" style={{ animationDelay: '0.1s' }}>
                                            <div className="metric-icon">
                                                <i className="bi bi-clock-history"></i>
                                            </div>
                                            <div className="metric-content">
                                                <h3 className="metric-value">{stats.pending}</h3>
                                                <p className="metric-label">Pending</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="stats-card metric-card progress-card-small fade-in-up" style={{ animationDelay: '0.2s' }}>
                                            <div className="metric-icon">
                                                <i className="bi bi-arrow-clockwise"></i>
                                            </div>
                                            <div className="metric-content">
                                                <h3 className="metric-value">{stats.inProgress}</h3>
                                                <p className="metric-label">In Progress</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="stats-card metric-card completed-card fade-in-up" style={{ animationDelay: '0.3s' }}>
                                            <div className="metric-icon">
                                                <i className="bi bi-check-circle"></i>
                                            </div>
                                            <div className="metric-content">
                                                <h3 className="metric-value">{stats.completed}</h3>
                                                <p className="metric-label">Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6">
                                        <div className="stats-card metric-card overdue-card fade-in-up" style={{ animationDelay: '0.4s' }}>
                                            <div className="metric-icon">
                                                <i className="bi bi-exclamation-triangle"></i>
                                            </div>
                                            <div className="metric-content">
                                                <h3 className="metric-value">{stats.overdue}</h3>
                                                <p className="metric-label">Overdue</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {tasksError && (
                        <div className="error-alert">
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {tasksError}
                            </div>
                        </div>
                    )}

                    {/* Tasks Section */}
                    <div className="tasks-section fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <div className="tasks-card p-2">
                            <div className="tasks-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="tasks-title">
                                        <i className="bi bi-kanban me-2"></i>
                                        Your Tasks
                                    </h2>
                                    <div className="tasks-count">
                                        <span className="badge bg-primary">{tasks.length} tasks</span>
                                    </div>
                                </div>
                            </div>

                            <TaskFilters
                                filter={filter}
                                setFilter={setFilter}
                                sort={sort}
                                setSort={setSort}
                            />

                            <TaskList
                                tasks={tasks}
                                loading={tasksLoading}
                                onEditTask={handleEditTask}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Task Modal */}
            {showTaskModal && (
                <TaskModal
                    task={editingTask}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Dashboard;
