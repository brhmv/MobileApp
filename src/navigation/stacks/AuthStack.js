import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../../screens/login/LoginPage';
import SignUpPage from '../../screens/register/SignUpPage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SignUp"
                component={SignUpPage}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};

export default AuthStack;