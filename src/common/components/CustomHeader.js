import React from 'react';
import { View, Text, Button } from 'react-native';

const CustomHeader = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#f8f8f8' }}>

            <Button title="Back" onPress={() => navigation.goBack()} />

            <Text style={{ fontSize: 20 }}>App Header</Text>

            <Button title="Menu" onPress={() => { /* Handle menu click */ }} />
        </View>
    );
};

export default CustomHeader;
