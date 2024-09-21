import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Basket from '../../screens/basket/Basket';
import CustomHeader from '../../common/components/CustomHeader';

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

        </Stack.Navigator>
    );
};

export default BasketStack;