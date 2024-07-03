import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize navigate hook

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });
    const[alert,setAlert] = useState(null)
    const { username, password } = loginForm;

    const onChangeLoginForm = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        });
    };

    const login = async (event) => {
        event.preventDefault();
        try {
            const loginData = await loginUser(username, password); 
            if (loginData.success){
                navigate('/dashboard');
            }
            else {
                setAlert({type: 'danger',message: loginData.message})
                setTimeout(() => setAlert(null),5000)
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?{' '}
                <Link to="/register">
                    <Button variant="info" className="ml-2">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
