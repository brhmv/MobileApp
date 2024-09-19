import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TextInput, View, Text } from 'react-native';
import HomeItem from './HomeItem';
import { useNavigation } from '@react-navigation/native';
import { StyledView } from '@common/StyledComponents';
import { useMMKVString } from 'react-native-mmkv';

const Homepage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [token] = useMMKVString('token');
  const navigation = useNavigation();

  const categories = [
    { id: '1', name: 'Foods', icon: '🍔' },
    { id: '2', name: 'Gift', icon: '🎁' },
    { id: '3', name: 'Fashion', icon: '👗' },
    { id: '4', name: 'Gadget', icon: '📱' },
    { id: '5', name: 'Accessory', icon: '💍' },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.0.117:3000/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      setData(result.products);
      setFilteredData(result.products)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleItemPress = (item) => {
    navigation.navigate('DetailsPage', { item });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <StyledView className="flex-1 justify-center">

      <View className="flex-row justify-between items-center p-5 bg-white">
        <Text className="text-2xl font-bold text-black">Trendyol</Text>

        <TextInput
          className="bg-gray-200 px-3 py-2 rounded-lg w-3/5 text-black"
          placeholder="Search"
          placeholderTextColor="black"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View className="pb-2 bg-white rounded-lg shadow-md mb-2">
        <Text className="text-lg font-bold mb-2 text-black text-center">Categories</Text>

        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <View className="flex items-center mr-5">
              <Text className="text-2xl">{item.icon}</Text>
              <Text className="text-black">{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 40
          }}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <HomeItem item={item} onPress={handleItemPress} />
          )}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          key={'2-columns'}
        />
      )}
    </StyledView>
  );
};

export default Homepage;