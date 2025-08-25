// Format date for display
export const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((date - now) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';
    if (diffInDays === -1) return 'Yesterday';
    if (diffInDays > 1 && diffInDays <= 7) return `In ${diffInDays} days`;
    if (diffInDays < -1 && diffInDays >= -7) return `${Math.abs(diffInDays)} days ago`;

    return date.toLocaleDateString();
};

// Format date for input field
export const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

// Get status color
export const getStatusColor = (status) => {
    const colors = {
        'pending': '#fbbf24',
        'in_progress': '#3b82f6',
        'completed': '#10b981'
    };
    return colors[status] || '#6b7280';
};

// Get priority color
export const getPriorityColor = (priority) => {
    const colors = {
        'low': '#10b981',
        'medium': '#f59e0b',
        'high': '#ef4444'
    };
    return colors[priority] || '#6b7280';
};

// Capitalize first letter
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Get greeting based on time
export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
};

// Local storage helpers
export const getFromStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error getting from storage:', error);
        return null;
    }
};

export const setToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting to storage:', error);
    }
};

export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from storage:', error);
    }
};
