import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import filter from 'lodash.filter';

// Components
import { Input } from '@ui-kitten/components';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

// Data
import AnimalData from '../../config/data/Animal';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// Sizing
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 18,
        fontFamily: 'RobotoMono_700Bold',
        color: 'white',
        paddingTop: 5
    },
    animalType: {
        fontSize: 15,
        opacity: 0.7,
        top: 5,
        color: 'grey',
        fontFamily: 'RobotoMono_700Bold'
    },
    searchInput: {
        padding: SPACING, 
        top: CELL_HEIGHT / 10, 
        borderRadius: 10, 
        backgroundColor: 'white', 
        width: width / 1.30, 
        borderColor: defaultBackground
    },
    addIcon: {
        top: CELL_HEIGHT / 5,
        left: width / 30
    },
    hideList: {
        opacity: 0,
        height: 0
    }
});

export default function AnimalList (props) {
    const navigation = useNavigation()

    // SEARCH BAR
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

    useEffect(() => {
        setData(AnimalData)
        setFullData(AnimalData)
    }, []);

    const contains = ({ animal_id, animal_breed, animal_doesing }, query) => {
        if (animal_id.includes(query) || animal_breed.includes(query) || animal_doesing.includes(query)) {
          return true;
        }
        return false;
    };

    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, animal => {
          return contains(animal, formattedQuery);
        });
        setData(filteredData);
        setQuery(text);
    };

    //SEARCH BAR
    const renderHeader = () => (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 15
            }}
        >
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={query}
                onChangeText={handleSearch}
                placeholder="Search"
                style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
        </View>     
    )

    return (
        <FlatList
            stickyHeaderIndices={[0]}
            ListHeaderComponent={renderHeader}
            style={props.homescreen ? styles.hideList : styles.noHide}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{ padding: SPACING }}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AnimalDetail', {item})}
                    style={{ marginBottom: CELL_HEIGHT / 10, top: CELL_HEIGHT / 10, height: CELL_HEIGHT * 1.4 }}
                    >
                    <View style={{ flex: 1, padding: SPACING }}>
                        <View style={[StyleSheet.absoluteFillObject,
                            { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                        <Text style={styles.name}>ID: {item.animal_id}</Text>
                        <Text style={styles.animalType}>{item.animal_type}</Text>
                        <View
                            style={{
                                borderBottomColor: '#9D9D9D',
                                borderBottomWidth: 1,
                                top: CELL_HEIGHT / 10
                            }}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style={{fontSize: 15, paddingTop: CELL_HEIGHT / 4.5, color: 'grey', fontFamily: 'RobotoMono_700Bold'}}>Sex</Text>
                                <Text style={{fontSize: 16, color: 'white', fontFamily: 'RobotoMono_700Bold'}}>{item.animal_sex}</Text>
                            </View>
                            <View style={{position: 'absolute', right: 0}}>
                                <Text style={{fontSize: 15, paddingTop: CELL_HEIGHT / 4.5, color: 'grey', fontFamily: 'RobotoMono_700Bold'}}>Date of Birth</Text>
                                <Text style={{fontSize: 16, color: 'white', fontFamily: 'RobotoMono_700Bold' }}>{item.animal_dob}</Text>
                            </View>
                        </View>
                        <Text style={{fontSize: 15, paddingTop: CELL_HEIGHT / 7, color: 'grey', fontFamily: 'RobotoMono_700Bold'}}>Breed</Text>
                        <Text style={{color: 'white', fontSize: 16, fontFamily: 'RobotoMono_700Bold'}}>{item.animal_breed}</Text>
                    </View>
                </TouchableOpacity>
            )}
        /> 
    );
};