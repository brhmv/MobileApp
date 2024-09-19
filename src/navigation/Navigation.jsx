import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BasketProvider } from '../screens/basket/BasketContext';
import AuthStack from './stacks/AuthStack';
import TabNavigator from './TabNavigator';
import { useMMKVString } from 'react-native-mmkv';

const Navigation = () => {
    const [token] = useMMKVString('token');
    const isAuthenticated = !!token;

    return (
        <BasketProvider>
            <NavigationContainer>
                {isAuthenticated ? <TabNavigator /> : <AuthStack />}
            </NavigationContainer>
        </BasketProvider>
    );
};

export default Navigation;
