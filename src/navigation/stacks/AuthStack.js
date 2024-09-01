import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../../screens/login/LoginPage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={LoginPage} />
        </Stack.Navigator>
    );
};

export default AuthStack;
