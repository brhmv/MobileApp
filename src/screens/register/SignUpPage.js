import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SignUpPage = ({ navigation }) => {
    return (
        <View className="flex-1 justify-center bg-gray-100 px-4">
            <Text className="text-2xl font-bold mb-5 text-black">Sign Up</Text>

            <TextInput
                className="h-10 border border-gray-300 mb-3 px-2"
                placeholder="Username"
                placeholderTextColor="#888"
            />

            <TextInput
                className="h-10 border border-gray-300 mb-3 px-2"
                placeholder="Email"
                placeholderTextColor="#888"
            />

            <TextInput
                className="h-10 border border-gray-300 mb-3 px-2"
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#888"
            />

            <View className="mb-3">
                <Button title="Sign Up" onPress={() => { }} />
            </View>

            <View className="mb-3">
                <Button
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login')}
                    color="#007bff"
                />
            </View>
        </View>
    );
};

export default SignUpPage;