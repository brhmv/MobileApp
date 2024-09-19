import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { storage } from '../../utility/MMKV';

const MyProfile = () => {
    const [token] = useMMKVString('token');
    const [userData, setUserData] = useState(null);

    console.log(token);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://192.168.0.117:3000/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (token) {
            fetchUserProfile();
        }
    }, [token]);

    if (!userData) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-500">Loading profile...</Text>
            </View>
        );
    }

    const handleLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: () => {
                        storage.clearAll();
                    }
                }
            ]
        );
    };


    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-6 items-center">
                {/* <Icon name="person" size={100} color="#4CAF50" /> */}
                <Icon name="person" size={100} color="blue" />
                <Text className="text-3xl font-bold text-black mt-4">{userData.username}</Text>
                <Text className="text-xl text-gray-700">{userData.email}</Text>
                {userData.isAdmin && (
                    <View className="bg-red-500 px-4 py-2 rounded-full mt-4">
                        <Text className="text-white font-semibold">Admin User</Text>
                    </View>
                )}
            </View>

            <View className="px-6 mt-6">
                <Text className="text-2xl font-bold text-black">Account Details</Text>
                <View className="bg-gray-100 p-4 rounded-lg mt-4">
                    <Text className="text-lg font-semibold text-black">Email:</Text>
                    <Text className="text-base text-gray-800">{userData.email}</Text>
                </View>

                <View className="bg-gray-100 p-4 rounded-lg mt-4">
                    <Text className="text-lg font-semibold text-black">Username:</Text>
                    <Text className="text-base text-gray-800">{userData.username}</Text>
                </View>

                <View className="bg-gray-100 p-4 rounded-lg mt-4">
                    <Text className="text-lg font-semibold text-black">Admin Status:</Text>
                    <Text className="text-base text-gray-800">{userData.isAdmin ? 'Yes' : 'No'}</Text>
                </View>

                <View className="bg-gray-100 p-4 rounded-lg mt-4">
                    <Text className="text-lg font-semibold text-black">Basket Items:</Text>
                    <Text className="text-base text-gray-800">
                        {userData.basket.length} item(s) in your basket
                    </Text>
                </View>
            </View>


            <View className="mt-8 px-6">
                <TouchableOpacity
                    className="bg-red-500 py-3 rounded-full items-center"
                    onPress={handleLogout}
                >
                    <Text className="text-white text-lg font-bold">Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default MyProfile;