import { StyledView } from '@common/StyledComponents';
import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import HomeItem from './HomeItem';

const Homepage = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <StyledView className="flex-1 justify-center">
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HomeItem item={item} />}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        )}
      </StyledView>
    </>
  );
};

export default Homepage;