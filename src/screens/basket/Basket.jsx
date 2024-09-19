import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { BasketContext } from '../basket/BasketContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Basket = () => {
    const { basket, removeFromBasket } = useContext(BasketContext);

    const keyExtractor = (item) => {
        return item.name + Math.random().toString();
    };

    return (
        <View className="flex-1 bg-white p-4 justify-center">
            {basket.length === 0 ? (
                <Text className="text-lg text-black text-center">Your basket is empty.</Text>
            ) : (
                <FlatList
                    data={basket}
                    keyExtractor={keyExtractor}
                    renderItem={({ item }) => (
                        <View className="mb-4 p-4 border rounded-lg bg-gray-100">
                            <Text className="text-lg font-semibold text-black">{item.name}</Text>
                            <Text className="text-base text-black">Price: ${item.price}</Text>
                            <Text className="text-base text-black">Quantity: {item.quantity}</Text>
                            <Text className="text-base text-black">Color: {item.selectedColor}</Text>

                            <TouchableOpacity
                                onPress={() => removeFromBasket(item._id)}
                                className="mt-2 flex-row items-center bg-red-500 px-4 py-2 rounded-md"
                            >
                                <Icon name="delete" size={20} color="#fff" />
                                <Text className="ml-2 text-white">Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default Basket;