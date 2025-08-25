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
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-200 h-20 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-200">
            {tasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleStatusChange(task, task.status === 'completed' ? 'pending' : 'completed')}
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${task.status === 'completed'
                                            ? 'bg-green-500 border-green-500'
                                            : 'border-gray-300 hover:border-green-500'
                                        }`}
                                >
                                    {task.status === 'completed' && (
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>

                                <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                                    }`}>
                                    {task.title}
                                </h3>

                                <div className="flex items-center space-x-2">
                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: `${getStatusColor(task.status)}20`,
                                            color: getStatusColor(task.status)
                                        }}
                                    >
                                        {capitalize(task.status.replace('_', ' '))}
                                    </span>

                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: `${getPriorityColor(task.priority)}20`,
                                            color: getPriorityColor(task.priority)
                                        }}
                                    >
                                        {capitalize(task.priority)} Priority
                                    </span>
                                </div>
                            </div>

                            {task.description && (
                                <p className="mt-2 text-gray-600">{task.description}</p>
                            )}

                            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                                <span>Created: {formatDate(task.created_at)}</span>
                                {task.due_date && (
                                    <span className={`${new Date(task.due_date) < new Date() && task.status !== 'completed'
                                            ? 'text-red-600 font-medium'
                                            : ''
                                        }`}>
                                        Due: {formatDate(task.due_date)}
                                        {new Date(task.due_date) < new Date() && task.status !== 'completed' && (
                                            <span className="ml-1">(Overdue)</span>
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                            <button
                                onClick={() => onEditTask(task)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit task"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>

                            <button
                                onClick={() => handleDelete(task.id)}
                                disabled={deletingId === task.id}
                                className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                title="Delete task"
                            >
                                {deletingId === task.id ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
