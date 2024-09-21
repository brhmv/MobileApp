import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Input from './Input';
import PasswordInput from './PasswordInput';
import { storage } from '../../utility/MMKV';

const LoginPage = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: storage.getString('email') || '',
        password: '',
    });

    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleInputChange = (inputName, inputValue) => {
        setFormData({
            ...formData,
            [inputName]: inputValue,
        });
    };

    const handleLogin = async () => {
        let valid = true;
        let tempErrors = { email: '', password: '' };

        if (!formData.email) {
            tempErrors.email = 'Email is required';
            valid = false;
        }

        if (!formData.password) {
            tempErrors.password = 'Password is required';
            valid = false;
        }

        if (valid) {
            try {
                const response = await fetch('http://192.168.0.117:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = response.json();

                if (response.ok) {
                    storage.set('token', data.accessToken);
                    storage.set('refreshToken', data.refreshToken);
                    Alert.alert('Login Successful!', `Logged in as: ${formData.email}`);

                } else {
                    Alert.alert('Error', data.message || 'Invalid email or password.');
                }
            } catch (error) {
                Alert.alert('Error', `Unable to login. Please check your network connection and try again. Error: ${error.message}`);
            }
        } else {
            setErrors(tempErrors);
        }
    };


    return (
        <View className="flex-1 justify-center bg-gray-100 px-4">
            <Text className="text-2xl font-bold mb-5 text-black">Login</Text>

            <Input
                inputName="email"
                inputValue={formData.email}
                handleInputChange={handleInputChange}
                placeholder="Enter email"
                error={errors.email}
            />

            <PasswordInput
                inputName="password"
                inputValue={formData.password}
                handleInputChange={handleInputChange}
                placeholder="Enter password"
                error={errors.password}
            />

            <View className="mb-3">
                <TouchableOpacity
                    style={{
                        backgroundColor: '#007bff',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}
                    onPress={handleLogin}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
                </TouchableOpacity>
            </View>

            <View className="mb-3">
                <TouchableOpacity
                    style={{
                        backgroundColor: '#007bff',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Don't Have Account? Register Here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginPage;