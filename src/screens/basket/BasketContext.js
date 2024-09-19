import React, { createContext, useState, useEffect } from 'react';
import { useMMKVString } from 'react-native-mmkv';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);
    const [token] = useMMKVString('token');

    useEffect(() => {
        const fetchBasket = async () => {

            if (!token) {
                return;
            }

            try {
                const response = await fetch('http://192.168.0.117:3000/basket', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                if (!response.ok && token != undefined) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setBasket(data);
            } catch (error) {
                console.error('Error fetching basket:', error);
            }
        };

        fetchBasket();
    }, [token]);

    const addToBasket = (item) => {
        setBasket((prevBasket) => [...prevBasket, item]);
    };

    const removeFromBasket = (itemId) => {
        setBasket((prevBasket) => prevBasket.filter(item => item._id !== itemId));
    };

    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
            {children}
        </BasketContext.Provider>
    );
};