import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { storage } from '../../utility/MMKV';


const CustomHeader = ({ title }) => {

    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#f8f8f8' }}>


            {navigation.canGoBack() && <Button title="Back" onPress={() => navigation.goBack()} />
            }

            <Text style={{ fontSize: 20 }}>{title}</Text>

            {title === "Home" && <Button title="Sign Out" onPress={() => { storage.delete("token"); }} />}


        </View>
    );
};

export default CustomHeader;
