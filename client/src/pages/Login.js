import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false); // State for loading indicator
    const [formData, setFormData] = useState({ email: '', password: '', remember: true });

    const onFinish = async () => {
        setLoading(true); // Set loading state to true
        try {
            dispatch(showLoading());
            const response = await axios.post('api/v1/user/login', formData);
            dispatch(hideLoading());
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                message.success("Login Successful!");
                navigate('/');
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        } finally {
            setLoading(false); // Set loading state back to false
        }
    };

    return (
        <div className='form-container'>
            <Form
                name="basic"
                className='card p-4'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <h3 className='text-center p-3'> Login Form</h3>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}>Remember me</Checkbox>
                </Form.Item>

                <Link to="/register" className='text-center m-2'>Create new account</Link>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
