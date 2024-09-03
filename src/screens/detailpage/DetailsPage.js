import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetailsPage = () => {
    const route = useRoute();
    const { item } = route.params;

    return (
        <ScrollView contentContainerStyle="flex-grow p-4 bg-gray-100">
            <View className="bg-white rounded-lg p-4 shadow-md">
                <Text className="text-lg font-semibold text-gray-600 mb-1">Email:</Text>
                <Text className="text-base text-gray-800 mb-3">{item.email}</Text>

                <Text className="text-lg font-semibold text-gray-600 mb-1">Phone:</Text>
                <Text className="text-base text-gray-800 mb-3">{item.phone}</Text>

                <Text className="text-lg font-semibold text-gray-600 mb-1">Address:</Text>
                <Text className="text-base text-gray-800 mb-1">{item.address.street}</Text>
                <Text className="text-base text-gray-800">{item.address.city}</Text>
            </View>
        </ScrollView>
    );
};

export default DetailsPage;