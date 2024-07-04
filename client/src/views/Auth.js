import React, { useContext } from 'react';
import '../App.css'; // Import the CSS file
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import { Spinner } from 'react-bootstrap';

const Auth = ({ authRoute }) => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);
    
    let body; // Declare body here
    
    // Render loading spinner if authentication state is loading
    if (authLoading) {
        return (
            <div className='landing'>
                <div className='dark-overlay'>
                    <div className='landing-inner'>
                        <Spinner animation='border' variant='info' />
                    </div>
                </div>
            </div>
        );
    }

    // Redirect to dashboard if user is already authenticated
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />;
    }

    // Render login or register form based on authRoute prop
    body = (
        <>
            {authRoute === 'login' && <LoginForm />}
            {authRoute === 'register' && <RegisterForm />}
        </>
    );

    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>Learnit</h1>
                    <h4>Keep track of what you are learning</h4>
                    {body}
                </div>
            </div>
        </div>
    );
}

export default Auth;
