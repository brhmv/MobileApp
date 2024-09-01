import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetailsPage = () => {
    const route = useRoute();
    const { item } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.text}>{item.email}</Text>

                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.text}>{item.phone}</Text>

                <Text style={styles.label}>Address:</Text>
                <Text style={styles.text}>{item.address.street}</Text>
                <Text style={styles.text}>{item.address.city}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    detailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 4,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
    },
});

export default DetailsPage;
