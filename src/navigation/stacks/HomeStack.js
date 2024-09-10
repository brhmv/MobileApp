import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../../screens/homepage/Homepage';
import DetailsPage from '../../screens/detailpage/DetailsPage';
import CustomHeader from '../../common/components/CustomHeader';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='Homepage'>
            <Stack.Screen
                name="Homepage"
                component={Homepage}
                options={{ header: () => <CustomHeader title="Home" /> }}

            />

            <Stack.Screen
                name="DetailsPage"
                component={DetailsPage}
                options={{ title: 'Details' }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;