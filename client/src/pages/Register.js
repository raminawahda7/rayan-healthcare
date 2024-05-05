import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterStyles.css';

const Register = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            console.log('values', values);
            const response = await axios.post('/api/v1/user/register', values);
            if (response.data.success) {
                message.success("Registered Successfully");
                navigate('/login');
            } else {
                message.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong");
        }
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='form-container'>
            <Form
                name="basic"
                className='card p-4'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h3 className='text-center p-3'> Register Form</h3>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link to="/login" className='text-center m-2'>Already have an account? Log in</Link>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register