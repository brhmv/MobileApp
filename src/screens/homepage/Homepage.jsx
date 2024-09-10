import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Text, TextInput, Button, View, KeyboardAvoidingView } from 'react-native';
import HomeItem from './HomeItem';
import { useNavigation } from '@react-navigation/native';
import { StyledView } from '@common/StyledComponents';
import { useMMKVString } from 'react-native-mmkv';


const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [token] = useMMKVString('token');
  const navigation = useNavigation();

  useEffect(() => {

    console.log(token);

    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.117:5000/api/todos/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });


        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleAddTodo = async () => {
    if (!newTodo) {
      alert('Please enter a todo title.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.117:5000/api/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error adding todo: ${errorText}`);
      }

      const newTodoItem = await response.json();
      setData((prevData) => [...prevData, newTodoItem]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('DetailsPage', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <HomeItem item={item} />
    </TouchableOpacity>
  );

  return (
    <StyledView className="flex-1 justify-center">
      <Text style={{ color: 'black', fontSize: 18, padding: 10 }}>Hello</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}

      <KeyboardAvoidingView behavior="padding" style={{ width: '100%', position: 'absolute', bottom: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <TextInput
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="Enter new todo"
            style={{
              flex: 1,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 4,
              paddingHorizontal: 8,
              marginRight: 8,
              color: 'black',
            }}
          />
          <Button title="Add Todo" onPress={handleAddTodo} />
        </View>
      </KeyboardAvoidingView>
    </StyledView>
  );
};

export default Homepage;