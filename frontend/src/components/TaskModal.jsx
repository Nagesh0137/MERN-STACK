import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { validateTaskForm } from '../utils/validation';
import { formatDateForInput } from '../utils/helpers';

const TaskModal = ({ task, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { createTask, updateTask } = useApp();

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'pending',
                priority: task.priority || 'medium',
                due_date: task.due_date ? formatDateForInput(task.due_date) : ''
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateTaskForm(formData.title, formData.description, formData.due_date);

        if (!validation.isValid) {
            setErrors(validation.errors);
            // Focus on the first error field
            const firstErrorField = Object.keys(validation.errors)[0];
            const errorElement = document.getElementById(firstErrorField);
            if (errorElement) {
                errorElement.focus();
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setLoading(true);

        try {
            let result;
            if (task) {
                result = await updateTask(task.id, formData);
            } else {
                result = await createTask(formData);
            }

            if (result.success) {
                onClose();
            } else {
                setErrors({ general: result.message });
            }
        } catch (error) {
            setErrors({ general: 'An unexpected error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal show d-block task-modal-overlay" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content task-modal-content">
                    <div className="modal-header task-modal-header">
                        <h5 className="modal-title">
                            <i className={`bi ${task ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
                            {task ? 'Edit Task' : 'Create New Task'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close task-modal-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body task-modal-body">
                        <form onSubmit={handleSubmit} noValidate>
                            {errors.general && (
                                <div className="alert alert-danger error-alert d-flex align-items-center" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    {errors.general}
                                </div>
                            )}

                            {/* Title Field - Required */}
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">
                                    <i className="bi bi-card-text me-2"></i>
                                    Task Title
                                    <span className="required-asterisk">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={`form-control ${errors.title ? 'is-invalid error-field' : ''} ${formData.title ? 'has-value' : ''}`}
                                    placeholder="Enter a clear and descriptive task title"
                                    maxLength="255"
                                />
                                {errors.title && (
                                    <div className="error-message">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {errors.title}
                                    </div>
                                )}
                                <div className="character-count">
                                    {formData.title.length}/255 characters
                                </div>
                            </div>

                            {/* Description Field - Optional */}
                            <div className="form-group">
                                <label htmlFor="description" className="form-label">
                                    <i className="bi bi-text-paragraph me-2"></i>
                                    Description
                                    <span className="optional-label">(Optional)</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={`form-control ${errors.description ? 'is-invalid error-field' : ''} ${formData.description ? 'has-value' : ''}`}
                                    placeholder="Add additional details about your task"
                                    maxLength="1000"
                                />
                                {errors.description && (
                                    <div className="error-message">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {errors.description}
                                    </div>
                                )}
                                <div className="character-count">
                                    {formData.description.length}/1000 characters
                                </div>
                            </div>

                            {/* Status and Priority Row */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="status" className="form-label">
                                            <i className="bi bi-flag me-2"></i>
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="form-select custom-select"
                                        >
                                            <option value="pending">📋 Pending</option>
                                            <option value="in_progress">⚡ In Progress</option>
                                            <option value="completed">✅ Completed</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="priority" className="form-label">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            Priority
                                        </label>
                                        <select
                                            id="priority"
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            className="form-select custom-select"
                                        >
                                            <option value="low">🟢 Low Priority</option>
                                            <option value="medium">🟡 Medium Priority</option>
                                            <option value="high">🔴 High Priority</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Due Date Field */}
                            <div className="form-group">
                                <label htmlFor="due_date" className="form-label">
                                    <i className="bi bi-calendar-event me-2"></i>
                                    Due Date
                                    <span className="optional-label">(Optional)</span>
                                </label>
                                <input
                                    type="date"
                                    id="due_date"
                                    name="due_date"
                                    value={formData.due_date}
                                    onChange={handleChange}
                                    className={`form-control ${errors.due_date ? 'is-invalid error-field' : ''} ${formData.due_date ? 'has-value' : ''}`}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                {errors.due_date && (
                                    <div className="error-message">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {errors.due_date}
                                    </div>
                                )}
                                <div className="field-hint">
                                    <i className="bi bi-info-circle me-1"></i>
                                    Set a deadline to keep track of important tasks
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="btn btn-cancel"
                                >
                                    <i className="bi bi-x-lg me-2"></i>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary btn-submit"
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner-sm me-2"></div>
                                            {task ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : (
                                        <>
                                            <i className={`bi ${task ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
                                            {task ? 'Update Task' : 'Create Task'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
