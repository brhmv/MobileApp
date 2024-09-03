import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './stacks/HomeStack';
import AuthStack from './stacks/AuthStack';
import CustomHeader from '../common/components/CustomHeader';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                header: () => <CustomHeader navigation={navigation} />
            })}
        >
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


        </Stack.Navigator>
    );
};

export default StackNavigator;