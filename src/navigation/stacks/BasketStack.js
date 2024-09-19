import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Basket from '../../screens/basket/Basket';
import CustomHeader from '../../common/components/CustomHeader'; // Keep this for custom header

const Stack = createNativeStackNavigator();

const BasketStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Basket"
                component={Basket}
                options={{
                    header: () => <CustomHeader title="Basket" />
                }}
            />
            {/* <Stack.Screen
                name="BasketDetails"
                component={Basket}
                options={{
                    title: 'Basket Details',
                    headerShown: true
                }}
            /> */}
        </Stack.Navigator>
    );
};

export default BasketStack;
