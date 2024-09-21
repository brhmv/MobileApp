import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useMMKVString } from 'react-native-mmkv';
import { refreshTokens } from '../../utility/RefreshToken';

const DetailsPage = ({ route }) => {
    const { item } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(item.colors[0]);
    const [token] = useMMKVString('token');
    const navigation = useNavigation();

    const [refreshToggle, setRefreshToggle] = useState(false);

    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);


    const handleAddToBasket = async () => {
        try {
            console.log('Token:', token);
            console.log('Adding product to basket with ID:', item._id);

            let response = await fetch('http://192.168.0.117:3000/basket/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ productId: item._id, quantity })
            });

            if (!response.ok) {
                const rawResponse = await response.text();
                console.error('Raw error response:', rawResponse);

                if (response.status === 400 && rawResponse.includes('Invalid token')) {
                    console.log('Token is invalid, refreshing token...');

                    const newToken = await refreshTokens(token);

                    if (newToken) {
                        console.log('Retrying with refreshed token:', newToken);
                        response = await fetch('http://192.168.0.117:3000/basket/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${newToken}`
                            },
                            body: JSON.stringify({ productId: item._id, quantity })
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}.`);
                        }
                    } else {
                        throw new Error('Could not refresh token.');
                    }
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}. Raw response: ${rawResponse}`);
                }
            }

            Alert.alert("Item added to Basket Successfully!");

            setRefreshToggle(prev => !prev);
            navigation.navigate('BasketStack', { screen: 'Basket', params: { refreshToggle: refreshToggle } });

        } catch (error) {
            console.error('Error adding item to basket:', error);
            Alert.alert("Error", `Could not add item to basket: ${error.message}`);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="h-64 justify-center items-center bg-gray-100">
                <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
            </View>

            <View className="p-5">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold text-black">{item.name}</Text>
                    <View className="bg-orange-100 px-3 py-1 rounded-md">
                        <Text className="text-orange-400 font-bold">On Sale</Text>
                    </View>
                </View>

                <Text className="text-lg font-bold my-2 text-green-600">
                    ${item.price}
                </Text>

                <View className="flex-row items-center mb-3">
                    <View className="flex-row items-center mr-4">
                        <Icon name="star" size={20} color="#f5a623" />
                        <Text className="ml-1 text-base text-black">{item.rating}</Text>
                    </View>

                    <View className="flex-row items-center mr-4">
                        <Icon name="thumb-up" size={20} color="#4A90E2" />
                        <Text className="ml-1 text-base text-black">{item.likes}</Text>
                    </View>

                    <Text className="text-sm text-gray-500">{item.reviews} Reviews</Text>
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold mb-1 text-black">Color</Text>
                    <FlatList
                        horizontal
                        data={item.colors}
                        renderItem={({ item: color }) => (
                            <TouchableOpacity
                                className={`mr-2 ${selectedColor === color ? 'border-2 border-orange-400 rounded-full' : ''}`}
                                onPress={() => setSelectedColor(color)}
                            >
                                <View className="w-8 h-8 rounded-full" style={{ backgroundColor: color }} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(color) => color}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle="py-2"
                    />
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold mb-1 text-black">Description</Text>
                    <Text className="text-base text-gray-600">{item.description}</Text>
                </View>

                <View className="mb-5">
                    <Text className="text-lg font-bold mb-1 text-black">Specifications</Text>
                    <Text className="text-base text-gray-700">Model Name: {item.modelName}</Text>
                    <Text className="text-base text-gray-700">Color: {selectedColor}</Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={handleDecrement} className="px-3 py-2 bg-orange-300 rounded-md">
                            <Icon name="remove" size={20} color="#000" />
                        </TouchableOpacity>

                        <Text className="mx-3 text-lg text-black">{quantity}</Text>

                        <TouchableOpacity onPress={handleIncrement} className="px-3 py-2 bg-orange-300 rounded-md">
                            <Icon name="add" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={handleAddToBasket}
                        className="flex-row items-center bg-orange-400 px-5 py-3 rounded-md"
                    >
                        <Icon name="shopping-cart" size={20} color="#fff" />
                        <Text className="ml-2 text-white text-lg font-bold"> Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default DetailsPage;