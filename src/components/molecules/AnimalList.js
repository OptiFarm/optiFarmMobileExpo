import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import filter from 'lodash.filter';

// Components
import { Input } from '@ui-kitten/components';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

// Data
import AnimalData from '../../config/data/Animal';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// Sizing
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
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
    hideList: {
        opacity: 0,
        height: 0
    }
});

export default function AnimalList (props) {
    const navigation = useNavigation()

    // SEARCH
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

    const ItemView = ({ item }) => {
        return (
          // Flat List Item
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
        );
    };

    return (
        <>
            <SearchBar
                containerStyle={{backgroundColor: defaultBackground, borderTopWidth: 0, borderBottomWidth: 0}}
                inputContainerStyle={{backgroundColor: 'white'}}
                round
                searchIcon={{ size: 24 }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                placeholder="Search Animal"
                value={search}
            />
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