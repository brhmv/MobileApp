import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BasketContext } from '../basket/BasketContext';
import { useNavigation } from '@react-navigation/native';
import { useMMKVString } from 'react-native-mmkv';

import { refreshTokens } from '../../utility/RefreshToken';

const DetailsPage = ({ route }) => {
    const { item } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(item.colors[0]);
    const { addToBasket } = useContext(BasketContext);
    const navigation = useNavigation();

    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

    const [token] = useMMKVString('token');



    // const handleAddToBasket = async () => {

    //     try {
    //         console.log('Token:', token);
    //         console.log("Product:", item);
    //         console.log("Adding product to basket with ID:", item._id);

    //         const response = await fetch('http://192.168.0.117:3000/basket/add', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify({ productId: item._id })  // Use _id instead of id
    //         });

    //         const contentType = response.headers.get('Content-Type');

    //         if (!response.ok) {
    //             const rawResponse = await response.text();
    //             console.error('Raw error response:', rawResponse);

    //             if (contentType && contentType.includes('application/json')) {
    //                 const errorData = await response.json();
    //                 throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message || 'No additional error message provided'}`);
    //             } else {
    //                 throw new Error(`HTTP error! Status: ${response.status}. Raw response: ${rawResponse}`);
    //             }
    //         }

    //         if (contentType && contentType.includes('application/json')) {
    //             const data = await response.json();
    //             addToBasket({ ...item, quantity, selectedColor });
    //             Alert.alert("Item added to Basket Successfully!");
    //             navigation.navigate('BasketPage');
    //         } else {
    //             const rawResponse = await response.text();
    //             console.warn('Unexpected non-JSON response:', rawResponse);
    //             Alert.alert("Warning", "Received an unexpected response from the server.");
    //         }
    //     } catch (error) {
    //         console.error('Error adding item to basket:', error);
    //         Alert.alert("Error", `Could not add item to basket: ${error.message}`);
    //     }
    // };


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
                body: JSON.stringify({ productId: item._id })
            });

            const contentType = response.headers.get('Content-Type');

            if (!response.ok) {
                const rawResponse = await response.text();
                console.error('Raw error response:', rawResponse);

                if (response.status === 400 && rawResponse.includes('Invalid token')) {
                    console.log('Token is invalid, refreshing token...');


                    // refresh 
                    const newToken = await refreshTokens(token);


                    if (newToken) {
                        console.log('Retrying with refreshed token:', newToken);
                        response = await fetch('http://192.168.0.117:3000/basket/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${newToken}`
                            },
                            body: JSON.stringify({ productId: item._id })
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

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                addToBasket({ ...item, quantity, selectedColor });

                Alert.alert("Item added to Basket Successfully!");

                navigation.navigate('BasketStack', { screen: 'Basket' });
            } else {
                const rawResponse = await response.text();
                console.warn('Unexpected non-JSON response:', rawResponse);
                Alert.alert("Warning", "Received an unexpected response from the server.");
            }
        } catch (error) {
            console.error('Error adding item to basket:', error);
            Alert.alert("Error", `Could not add item to basket: ${error.message}`);
        }
    };


    return (
        <ScrollView className="flex-1 bg-white">
            {/* Product Image */}
            <View className="h-64 justify-center items-center bg-gray-100">
                <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
            </View>

            {/* Product Details */}
            <View className="p-5">
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold text-black">{item.name}</Text>
                    <View className="bg-purple-100 px-3 py-1 rounded-md">
                        <Text className="text-purple-700 font-bold">On Sale</Text>
                    </View>
                </View>

                <Text className="text-lg font-bold my-2 text-green-600">
                    ${item.price}
                </Text>

                {/* Ratings and Reviews */}
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

                {/* Color Options */}
                <View className="mb-5">
                    <Text className="text-lg font-bold mb-1 text-black">Color</Text>
                    <FlatList
                        horizontal
                        data={item.colors}
                        renderItem={({ item: color }) => (
                            <TouchableOpacity
                                className={`mr-2 ${selectedColor === color ? 'border-2 border-purple-700 rounded-full' : ''}`}
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

                {/* Description */}
                <View className="mb-5">
                    <Text className="text-lg font-bold mb-1 text-black">Description</Text>
                    <Text className="text-base text-gray-600">{item.description}</Text>
                </View>

                {/* Specifications */}
                <View className="mb-5">
                    <Text className="text-lg font-bold mb-1 text-black">Specifications</Text>
                    <Text className="text-base text-gray-700">Model Name: {item.modelName}</Text>
                    <Text className="text-base text-gray-700">Color: {selectedColor}</Text>
                </View>

                {/* Quantity and Buy Now */}
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={handleDecrement} className="px-3 py-2 bg-gray-200 rounded-md">
                            <Icon name="remove" size={20} color="#000" />
                        </TouchableOpacity>

                        <Text className="mx-3 text-lg text-black">{quantity}</Text>

                        <TouchableOpacity onPress={handleIncrement} className="px-3 py-2 bg-gray-200 rounded-md">
                            <Icon name="add" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={handleAddToBasket}
                        className="flex-row items-center bg-purple-700 px-5 py-3 rounded-md"
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
