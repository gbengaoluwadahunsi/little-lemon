import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ onComplete }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleNext = () => {
        if (name && email) {
            onComplete({ name, email });
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/lemon.jpg')}
                style={styles.logo}
            />
            <Text style={styles.hero}>
                <Text style={styles.title}>Little Lemon</Text>
                <Text style={styles.subtitle}>Chicago</Text>

                <Text style={styles.heropics}>
                    <Text style={styles.description}>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </Text>
                    <Image
                        source={require('../assets/set.jpg')}
                        style={styles.logo2}
                    />
                </Text>
            </Text>
            <View style={{ marginTop: 12, width: '100%' }}>
                <Text style={{ color: '#333333', fontWeight: '900' , paddingHorizontal: 20, paddingVertical: 10}}>Name*</Text>
            </View>


            <TextInput
                style={styles.input}
                placeholder="tilly"
                value={name}
                onChangeText={setName}
            />
            <View style={{ marginTop: 12, width: '100%' }}>
                <Text style={{ color: '#333333', fontWeight: '900' , paddingHorizontal: 20, paddingVertical: 10}}>Email*</Text>
            </View>



            <TextInput
                style={styles.input}
                placeholder="tidydoe@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TouchableOpacity
                style={[styles.button, (!name || !email) && styles.buttonDisabled]}
                onPress={handleNext}
                disabled={!name || !email}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        display: 'flex',
        alignItems: 'center',
    },
    logo2: {
        width: 150,
        height: 50,
        resizeMode: 'contain',


    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#F4CE14',
        paddingVertical: 0, // Top and bottom
        paddingHorizontal: 20, // Left and right (equivalent to '2em')

    },
    subtitle: {
        fontSize: 20,
        color: 'white',
        paddingVertical: 0, // Top and bottom
        paddingHorizontal: 20, // Left and right (equivalent to '2em')
    },
    description: {

        paddingHorizontal: 20, // Left and right (equivalent to '2em')
        marginVertical: 20,
        color: 'white',

    },
    input: {
        width: '90%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,


    },
    button: {
        backgroundColor: '#495E57',
        padding: 10,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
        marginTop: 12
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hero: {
        backgroundColor: '#495E57',
        display: 'flex',
        flexDirection: 'column'
    },
    heropics: {
        display: 'flex',
        gap: '1em',
        justifyContent: 'center',
        alignItems: 'center',

    },


});