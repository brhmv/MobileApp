import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, Modal, Button } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { storage } from '../../utility/MMKV';

const MyProfile = () => {
    const [token] = useMMKVString('token');
    const [userData, setUserData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                setUsername(data.username);
                setEmail(data.email);
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

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`http://192.168.0.117:3000/users/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const responseText = await response.text();
            if (!response.ok) {
                throw new Error(`Error updating profile: ${responseText}`);
            }

            const updatedData = JSON.parse(responseText);
            setUserData(updatedData);
            Alert.alert('Profile updated successfully!');
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-6 items-center">
                <Icon name="person" size={100} color="orange" />
                <Text className="text-3xl font-bold text-black mt-1">{userData.username}</Text>
                <Text className="text-xl text-gray-700">{userData.email}</Text>
                {userData.isAdmin && (
                    <View className="bg-red-500 px-4 py-2 rounded-full mt-4">
                        <Text className="text-white font-semibold">Admin User</Text>
                    </View>
                )}
                <TouchableOpacity onPress={() => setModalVisible(true)} className="mt-4">
                    <Icon name="edit" size={24} color="blue" />
                </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-orange-300 p-4 rounded-lg w-11/12 max-w-xl">
                        <Text className="text-xl font-bold text-black mb-4">Update Profile</Text>

                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            placeholderTextColor="black"
                            className="h-12 border border-black mb-4 p-3 text-lg rounded text-black"
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="black"
                            className="h-12 border border-black mb-4 p-3 text-lg rounded text-black"
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="black"
                            className="h-12 border border-black mb-4 p-3 text-lg rounded text-black placeholder-black"
                        />
                        <TouchableOpacity
                            className="bg-blue-500 py-2 rounded-full mb-4"
                            onPress={handleUpdateProfile}
                        >
                            <Text className="text-white text-lg text-center">Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-red-500 py-2 rounded-full mb-4"
                            onPress={() => setModalVisible(false)}
                        >
                            <Text className="text-white text-lg text-center">Close</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>


            <View className="px-6">
                <Text className="text-2xl font-bold text-black">Account Details</Text>
                <View className="bg-orange-300 p-4 rounded-lg mt-4">
                    <Text className="text-lg font-semibold text-black">Email:</Text>
                    <Text className="text-base text-gray-800">{userData.email}</Text>
                </View>

                <View className="bg-orange-300 p-4 rounded-lg mt-4">
                    <Text className="text-lg font-semibold text-black">Username:</Text>
                    <Text className="text-base text-gray-800">{userData.username}</Text>
                </View>

            </View>


            <View className="mt-4 px-6">
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