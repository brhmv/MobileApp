import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMMKVString } from 'react-native-mmkv';
import { useRoute } from '@react-navigation/native';

const Basket = () => {
    const [basket, setBasket] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [token] = useMMKVString('token');
    const route = useRoute();

    useEffect(() => {
        fetchBasket();
    }, [token, route.params?.refreshToggle]);

    const fetchBasket = async () => {
        if (!token) return;

        try {
            const response = await fetch('http://192.168.0.117:3000/basket', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setBasket(data.items);

            const price = calculateTotalPrice(data.items);
            setTotalPrice(price);
        } catch (error) {
            console.error('Error fetching basket:', error);
        }
    };

    const removeFromBasket = async (productId) => {
        try {
            const response = await fetch(`http://192.168.0.117:3000/basket/remove/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            fetchBasket();

            Alert.alert("Item removed from Basket!");
        } catch (error) {
            console.error('Error removing item from basket:', error);
            Alert.alert("Error", `Could not remove item from basket: ${error.message}`);
        }
    };

    const keyExtractor = (item) => item._id;

    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => {
            if (item.productId && item.productId.price && item.quantity) {
                return total + (item.productId.price * item.quantity);
            }
            return total;
        }, 0);
    };

    return (
        <View className="flex-1 bg-white p-4">
            {basket.length === 0 ? (
                <Text className="text-lg text-black text-center">Your basket is empty.</Text>
            ) : (
                <>
                    <FlatList
                        data={basket}
                        keyExtractor={keyExtractor}
                        renderItem={({ item }) => {
                            const { productId, quantity } = item;
                            return (
                                <View className="mb-4 p-4 border rounded-lg bg-orange-400 flex-row">
                                    <Image
                                        source={{ uri: productId?.image || 'https://via.placeholder.com/150' }}
                                        className="w-20 h-20 rounded-md mr-4"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1">
                                        <Text className="text-lg font-semibold text-black">
                                            {productId?.name || 'Product'}
                                        </Text>
                                        <Text className="text-base text-black">
                                            Price: ${productId?.price || 0}
                                        </Text>
                                        <Text className="text-base text-black">Quantity: {quantity}</Text>

                                        <TouchableOpacity
                                            onPress={() => removeFromBasket(productId?._id)}
                                            className="mt-2 flex-row items-center bg-red-500 px-4 py-2 rounded-md"
                                        >
                                            <Icon name="delete" size={20} color="#fff" />
                                            <Text className="ml-2 text-white">Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                    />
                    <View className="mt-1 p-4 border-t bg-orange-200">
                        <Text className="text-lg font-semibold text-black">
                            Total Price: ${totalPrice}
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
};

export default Basket;