import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useMMKVString } from 'react-native-mmkv';

import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';



const Navigation = () => {
    const [token] = useMMKVString('token');
    const isAuthenticated = !!token;

    return (
        <NavigationContainer>
            {isAuthenticated ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Navigation;
