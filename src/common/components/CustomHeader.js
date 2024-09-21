import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { storage } from '../../utility/MMKV';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeader = ({ title }) => {

    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#f8f8f8' }}>
            {navigation.canGoBack() && <Button title="Back" onPress={() => navigation.goBack()} />}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: "black" }}>{title}</Text>
                {title === "Basket" && (
                    <Icon name="shopping-basket" size={24} color="black" style={{ marginLeft: 8 }} />
                )}
            </View>

            {title === "Home" && (
                <Button title="Sign Out" onPress={() => { storage.delete("token"); }} />
            )}
        </View>
    );
};

export default CustomHeader;