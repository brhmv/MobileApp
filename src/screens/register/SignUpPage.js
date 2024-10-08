import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Input from '../login/Input';
import PasswordInput from '../login/PasswordInput';

const SignUpPage = ({ navigation }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });

    const handleInputChange = (inputName, inputValue) => {
        setFormData({
            ...formData,
            [inputName]: inputValue,
        });
    };

    const handleSignUp = async () => {
        let valid = true;
        let tempErrors = { username: '', email: '', password: '' };

        if (!formData.username) {
            tempErrors.username = 'Username is required';
            valid = false;
        }

        if (!formData.email) {
            tempErrors.email = 'Email is required';
            valid = false;
        }

        if (!formData.password) {
            tempErrors.password = 'Password is required';
            valid = false;
        }

        if (valid) {
            console.log("a0");
            try {
                const response = await fetch('http://192.168.0.117:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const text = await response.text();
                console.log('Response text:', text);

                if (response.ok) {
                    Alert.alert('Sign Up Successful!', `Welcome, ${formData.username}`);
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Error', text || 'Something went wrong, please try again.');
                }
            } catch (error) {
                console.log('Error', `Unable to register. Please check your network and try again. Error: ${error.message}`);
            }
        } else {
            setErrors(tempErrors);
        }
    };


    return (
        <View className="flex-1 justify-center bg-gray-100 px-4">
            <Text className="text-2xl font-bold mb-5 text-black">Sign Up</Text>

            <Input
                inputName="username"
                inputValue={formData.username}
                handleInputChange={handleInputChange}
                placeholder="Enter username"
                error={errors.username}
            />

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
                    onPress={handleSignUp}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Sign Up</Text>
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
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Already Have Account? Log in Here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUpPage;