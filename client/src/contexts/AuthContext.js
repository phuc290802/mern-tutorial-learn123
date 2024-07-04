import React, { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constant';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    });

    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            const response = await axios.get(`${apiUrl}/auth`);
            if(response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                });
            } else {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: false, user: null }
                });
            }
        } catch (error) {
            console.error('Load user error:', error);
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                await loadUser();
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return error.response.data;
            } else {
                return {
                    success: false,
                    message: 'Failed to login'
                };
            }
        }
    };

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null } });
    };

    const registerUser = async (username, password) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, { username, password });
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                await loadUser();
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return error.response.data;
            } else {
                return { success: false, message: error.message };
            }
        }
    };

    const AuthContextData = {
        loginUser,
        authState,
        registerUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
