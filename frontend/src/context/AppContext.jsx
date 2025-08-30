import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Action types
const AUTH_ACTION_TYPES = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    SET_USER: 'SET_USER'
};


const TASK_ACTION_TYPES = {
    FETCH_TASKS_START: 'FETCH_TASKS_START',
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_FAILURE: 'FETCH_TASKS_FAILURE',
    ADD_TASK: 'ADD_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    DELETE_TASK: 'DELETE_TASK',
    SET_FILTER: 'SET_FILTER',
    SET_SORT: 'SET_SORT'
};

// Initial state
const initialState = {
    // Auth state
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    authLoading: false,
    authError: null,

    // Tasks state
    tasks: [],
    tasksLoading: false,
    tasksError: null,
    filter: {
        status: '',
        priority: ''
    },
    sort: {
        field: 'created_at',
        order: 'DESC'
    }
};

// Reducer function
const appReducer = (state, action) => {
    switch (action.type) {
        // Auth actions
        case AUTH_ACTION_TYPES.LOGIN_START:
            return {
                ...state,
                authLoading: true,
                authError: null
            };

        case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                authLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                authError: null
            };

        case AUTH_ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                authLoading: false,
                authError: action.payload,
                isAuthenticated: false,
                user: null,
                token: null
            };

        case AUTH_ACTION_TYPES.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                tasks: [],
                authError: null
            };

        case AUTH_ACTION_TYPES.SET_USER:
            return {
                ...state,
                user: action.payload
            };

        // Task actions
        case TASK_ACTION_TYPES.FETCH_TASKS_START:
            return {
                ...state,
                tasksLoading: true,
                tasksError: null
            };

        case TASK_ACTION_TYPES.FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasksLoading: false,
                tasks: action.payload,
                tasksError: null
            };

        case TASK_ACTION_TYPES.FETCH_TASKS_FAILURE:
            return {
                ...state,
                tasksLoading: false,
                tasksError: action.payload
            };

        case TASK_ACTION_TYPES.ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            };

        case TASK_ACTION_TYPES.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                )
            };

        case TASK_ACTION_TYPES.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };

        case TASK_ACTION_TYPES.SET_FILTER:
            return {
                ...state,
                filter: { ...state.filter, ...action.payload }
            };

        case TASK_ACTION_TYPES.SET_SORT:
            return {
                ...state,
                sort: action.payload
            };

        default:
            return state;
    }
};

// Create context
const AppContext = createContext();

// API base URL
// const API_BASE_URL = 'https://mern-stack-production-9e65.up.railway.app/api'; // Hosted version
const API_BASE_URL = 'http://localhost:5000/api'; // Local development

// Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Context provider
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Set up axios interceptor to include token
    useEffect(() => {
        api.interceptors.request.use(
            (config) => {
                if (state.token) {
                    config.headers.Authorization = `Bearer ${state.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );
    }, [state.token]);

    // Auth actions
    const login = async (email, password) => {
        dispatch({ type: AUTH_ACTION_TYPES.LOGIN_START });

        try {
            const response = await api.post('/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);

            dispatch({
                type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
                payload: { token, user }
            });

            return { success: true, user };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            dispatch({
                type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
                payload: message
            });
            return { success: false, message };
        }
    };

    const register = async (name, email, password) => {
        dispatch({ type: AUTH_ACTION_TYPES.LOGIN_START });

        try {
            const response = await api.post('/register', { name, email, password });

            // Auto-login after registration
            const loginResult = await login(email, password);
            return loginResult;
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            dispatch({
                type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
                payload: message
            });
            return { success: false, message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
    };

    const fetchProfile = async () => {
        try {
            const response = await api.get('/profile');
            dispatch({
                type: AUTH_ACTION_TYPES.SET_USER,
                payload: response.data.user
            });
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    // Task actions
    const fetchTasks = async () => {
        dispatch({ type: TASK_ACTION_TYPES.FETCH_TASKS_START });

        try {
            const params = new URLSearchParams();
            if (state.filter.status) params.append('status', state.filter.status);
            if (state.filter.priority) params.append('priority', state.filter.priority);
            params.append('sortBy', state.sort.field);
            params.append('order', state.sort.order);

            const response = await api.get(`/tasks?${params}`);

            dispatch({
                type: TASK_ACTION_TYPES.FETCH_TASKS_SUCCESS,
                payload: response.data.tasks
            });
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch tasks';
            dispatch({
                type: TASK_ACTION_TYPES.FETCH_TASKS_FAILURE,
                payload: message
            });
        }
    };

    const createTask = async (taskData) => {
        try {
            const response = await api.post('/tasks', taskData);

            dispatch({
                type: TASK_ACTION_TYPES.ADD_TASK,
                payload: response.data.task
            });

            return { success: true, task: response.data.task };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create task';
            return { success: false, message };
        }
    };

    const updateTask = async (taskId, taskData) => {
        try {
            const response = await api.put(`/tasks/${taskId}`, taskData);

            dispatch({
                type: TASK_ACTION_TYPES.UPDATE_TASK,
                payload: response.data.task
            });

            return { success: true, task: response.data.task };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update task';
            return { success: false, message };
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);

            dispatch({
                type: TASK_ACTION_TYPES.DELETE_TASK,
                payload: taskId
            });

            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete task';
            return { success: false, message };
        }
    };

    const setFilter = (filter) => {
        dispatch({
            type: TASK_ACTION_TYPES.SET_FILTER,
            payload: filter
        });
    };

    const setSort = (sort) => {
        dispatch({
            type: TASK_ACTION_TYPES.SET_SORT,
            payload: sort
        });
    };

    // Load user profile on app start if token exists
    useEffect(() => {
        if (state.token && !state.user) {
            fetchProfile();
        }
    }, [state.token]);

    const value = {
        ...state,
        login,
        register,
        logout,
        fetchProfile,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setFilter,
        setSort
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export default AppContext;
