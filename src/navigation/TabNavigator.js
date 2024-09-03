import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import AuthStack from './stacks/AuthStack';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                tabBarInactiveTintColor: '#595959',
                tabBarLabelStyle: { fontSize: 14 },
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ tabBarLabel: 'Home', headerShown: false }}
            />
            <Tab.Screen
                name="AuthStack"
                component={AuthStack}
                options={{ tabBarLabel: 'Login', headerShown: false }}
            />

        </Tab.Navigator>
    );
};

export default TabNavigator;