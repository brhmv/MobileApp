import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsPage from '../../screens/detailpage/DetailsPage';

const Stack = createNativeStackNavigator();

const DetailsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DetailsPage"
                component={DetailsPage}
                options={{ title: 'Details' }}
            />
        </Stack.Navigator>
    );
};

export default DetailsStack;
