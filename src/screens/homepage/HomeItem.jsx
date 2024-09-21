import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

const HomeItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} className="flex-1 m-2 items-center bg-orange-400 rounded-lg p-3 shadow-lg">

            <Image source={{ uri: `${item.image}` }} className="w-40 h-24 rounded-md" />

            <Text className="mt-2 text-lg font-bold text-center">{item.name}</Text>

            <Text className="text-black font-semibold text-center">${item.price}</Text>

        </TouchableOpacity>
    );
};

export default HomeItem;