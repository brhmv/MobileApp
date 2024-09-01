import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/homepage/Homepage';
import LoginPage from '../screens/login/LoginPage';
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
                name="Homepage"
                component={Homepage}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="LoginPage"
                component={LoginPage}
                options={{
                    tabBarLabel: 'Login',
                    headerShown: false
                }}
            />




        </Tab.Navigator>
    );
};

export default TabNavigator;
