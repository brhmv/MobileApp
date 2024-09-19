import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './stacks/HomeStack';
import AuthStack from './stacks/AuthStack';
import BasketStack from './stacks/BasketStack';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AuthStack"
                component={AuthStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="BasketStack"
                component={BasketStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;