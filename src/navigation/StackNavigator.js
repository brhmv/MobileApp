import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './stacks/HomeStack';
import AuthStack from './stacks/AuthStack';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ headerShown: true }}
            />

            <Stack.Screen
                name="AuthStack"
                component={AuthStack}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
