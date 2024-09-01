import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../../screens/homepage/Homepage';
import DetailsPage from '../../screens/detailpage/DetailsPage';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="DetailsPage" component={DetailsPage} />
        </Stack.Navigator>
    );
};

export default HomeStack;