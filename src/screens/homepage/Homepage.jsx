import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import HomeItem from './HomeItem';
import { useNavigation } from '@react-navigation/native';
import { StyledView } from '@common/StyledComponents';


const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate('DetailsStack', {
      screen: 'DetailsPage',
      params: { item },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <HomeItem item={item} />
    </TouchableOpacity>
  );

  return (
    <StyledView className="flex-1 justify-center">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}
    </StyledView>
  );
};

export default Homepage;