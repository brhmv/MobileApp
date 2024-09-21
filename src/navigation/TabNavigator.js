import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BasketStack from './stacks/BasketStack';
import MyProfile from '../screens/myprofile/MyProfile';

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
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="BasketStack"
                component={BasketStack}
                options={{
                    tabBarLabel: 'Basket',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="shopping-cart" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="MyProfile"
                component={MyProfile}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
