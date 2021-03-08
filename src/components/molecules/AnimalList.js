import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { MaterialIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

// DATA
import AnimalData from '../../config/data/Animal';

// THEME
import { SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// SIZING
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontFamily: 'Sora-SemiBold',
        color: 'white',
        paddingTop: SPACING,
    },
    animalType: {
        fontSize: 18,
        top: 5,
        opacity: 0.8,
        color: 'white',
        fontFamily: 'Sora-SemiBold',
    },
    animalLabel: {
        fontSize: 18, 
        paddingTop: 35, 
        color: 'white', 
        opacity: 0.8, 
        fontFamily: 'Sora-SemiBold',
    },
    animalDesc: {
        color: 'white', 
        fontSize: 18, 
        fontFamily: 'Sora-SemiBold',
        top: 5,
    },
    border: {
        borderBottomColor: '#9D9D9D', 
        borderBottomWidth: 1, 
        top: 20,
    },
    hideList: {
        display: 'none',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default function AnimalList (props) {

    // NAVIGATION
    const navigation = useNavigation()

    // SEARCH FUNCTIONS
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        setFilteredDataSource(AnimalData);
        setMasterDataSource(AnimalData);
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) { 
                const itemData = item.animal_id ? item.animal_id.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    // FLATLIST ITEM
    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity 
                onPress={() => navigation.navigate('AnimalDetail', {item})}
                style={{ marginBottom: CELL_HEIGHT / 10, top: CELL_HEIGHT / 10, height: 265 }}
            >
                <View style={{ flex: 1, padding: SPACING }}>
                    <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderRadius: 15}]}/>
                    <Text style={styles.name}>ID: {item.animal_id}</Text>
                    <Text style={styles.animalType}>{item.animal_type}</Text>
                    <View style={styles.border}/>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={styles.animalLabel}>Sex</Text>
                            <Text style={styles.animalDesc}>{item.animal_sex}</Text>
                        </View>
                        <View style={{position: 'absolute', right: 0}}>
                            <Text style={styles.animalLabel}>Breed</Text>
                            <Text style={styles.animalDesc}>{item.animal_breed}</Text>
                        </View>
                    </View>
                    <Text style={styles.animalLabel}>Date of Birth</Text>
                    <Text style={styles.animalDesc}>{item.animal_dob}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
        <View style={styles.searchBar}>
            <SearchBar
                containerStyle={{backgroundColor: defaultBackground, borderTopWidth: 0, borderBottomWidth: 0, width: props.homescreen ? width : width - 50}}
                inputContainerStyle={{backgroundColor: '#F6F6F4'}}
                round
                searchIcon={{ size: 25 }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                placeholder="Search Animal"
                value={search}
            />
            <TouchableOpacity>
                {props.homescreen ? <></> : <MaterialIcons name="playlist-add" size={40} color="white" onPress={() => navigation.navigate('AnimalForm')}/>}
            </TouchableOpacity>
        </View>
        <FlatList
            style={props.homescreen ? styles.hideList : styles.noHide}
            showsVerticalScrollIndicator={false}
            data={filteredDataSource}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{ padding: SPACING }}
            renderItem={ItemView}
        /> 
        </>
    );
};