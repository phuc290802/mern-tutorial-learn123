import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const RegisterForm = () => {
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize navigate hook

    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [alert, setAlert] = useState(null);
    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value
        });
    };

    const register = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Passwords do not match' });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
        try {
            const registerData = await registerUser(username, password);
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message });
                setTimeout(() => setAlert(null), 5000);
            } else {
                navigate('/dashboard'); // Navigate to dashboard on successful registration
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name='username'
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name='password'
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">Register</Button>
            </Form>
            <p>Already have an account?
                <Link to='/login'>
                    <Button variant="info" className="ml-2">Login</Button>
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;
