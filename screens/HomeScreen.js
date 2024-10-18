import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
    {
        id: '1',
        name: 'Greek Salad',
        price: 12.99,
        category: 'starters',
        description: 'Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.',
        image: require('../assets/one.jpg'), // Update with actual image path
    },
    {
        id: '2',
        name: 'Bruschetta',
        price: 7.99,
        category: 'starters',
        description: 'Grilled bread rubbed with garlic and topped with olive oil and salt. Toppings of tomato, veggies, beans, cured pork, or cheese are common.',
        image: require('../assets/two.jpg'), // Update with actual image path
    },
    {
        id: '3',
        name: 'Grilled Fish',
        price: 20.99,
        category: 'mains',
        description: 'Enjoy our catch of the day, grilled to perfection with a side of vegetables.',
        image: require('../assets/three.jpg'), // Update with actual image path
    },
    {
        id: '4',
        name: 'Pasta',
        price: 15.99,
        category: 'mains',
        description: 'Choose from our selection of pasta dishes, all served with our homemade sauces.',
        image: require('../assets/one.jpg'), // Update with actual image path
    },
    {
        id: '5',
        name: 'Lemon Dessert',
        price: 6.99,
        category: 'desserts',
        description: 'A refreshing lemon dessert, perfect for cleansing your palate.',
        image: require('../assets/two.jpg'), // Update with actual image path
    },
];

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMenu, setFilteredMenu] = useState(menuItems);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigation = useNavigation();

    useEffect(() => {
        const filtered = menuItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedCategory === 'all' || item.category === selectedCategory)
        );
        setFilteredMenu(filtered);
    }, [searchQuery, selectedCategory]);

    const renderMenuItem = ({ item }) => (
        <View style={styles.menuItem}>
            <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
                <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <Image source={item.image} style={styles.menuImage} /> {/* Use the image from the item */}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/lemon.jpg')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../assets/images.jpeg')} style={styles.profileIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.hero}>
                <Text style={styles.heroTitle}>Little Lemon</Text>
                <Text style={styles.heroSubtitle}>Chicago</Text>
                <Text style={styles.heroDescription}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
            </View>
            <TextInput
                style={styles.searchBar}
                placeholder="Search menu items..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={styles.categoryButtons}>
                {['all', 'starters', 'mains', 'desserts'].map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={styles.categoryButtonText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filteredMenu}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id}
                style={styles.menuList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    hero: {
        backgroundColor: '#495E57',
        padding: 20,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F4CE14',
    },
    heroSubtitle: {
        fontSize: 20,
        color: '#fff',
    },
    heroDescription: {
        color: '#fff',
        marginTop: 10,
    },
    searchBar: {
        margin: 20,
        padding: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
    },
    categoryButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    categoryButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
    },
    selectedCategory: {
        backgroundColor: '#495E57',
    },
    categoryButtonText: {
        color: '#333',
    },
    menuList: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuImage: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    menuInfo: {
        flex: 1,
    },
    menuName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuDescription: {
        color: '#666',
        marginVertical: 5,
    },
    menuPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#495E57',
    },
});
