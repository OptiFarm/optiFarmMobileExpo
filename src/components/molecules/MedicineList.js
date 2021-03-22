import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { MaterialIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

// DATA
import MedicineData, { homepageMedicineData } from '../../config/data/Medicine';

// THEME
import { SPACING, width, height, defaultBackground, cardBackground, medicineLevelLow, medicineLevelMedium, medicineLevelHigh } from '../../config/theme';

// SIZING
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontFamily: 'Sora-SemiBold',
        color: 'white',
        paddingTop: 5
    },
    medicineType: {
        fontSize: 18,
        top: 5,
        opacity: 0.8,
        color: 'white',
        fontFamily: 'Sora-SemiBold'
    },
    hide: {
        display: 'none'
    },
    showHeader: {
        flexDirection: 'row'
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default function MedicineList (props) {

    // NAVIGATION
    const navigation = useNavigation()

    // SEARCH FUNCTIONS
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        setFilteredDataSource(MedicineData);
        setMasterDataSource(MedicineData);
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) { 
                const itemData = item.medicineName ? item.medicineName.toUpperCase() : ''.toUpperCase();
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

    // RENDER 3 FOR HOMEPAGE
    const data = props.homepage ? homepageMedicineData : filteredDataSource

    // FLATLIST ITEM
    const ItemView = ({ item }) => {

        const color = item.medicineLevel === 'Low Quantity' ? medicineLevelLow
                              : item.medicineLevel === 'Medium Quantity' ? medicineLevelMedium
                              : medicineLevelHigh

        return (
            <TouchableOpacity 
                onPress={() => navigation.navigate('Medicine', {screen: 'MedicineDetail', params: {item}})}
                style={{ marginBottom: CELL_HEIGHT / 10, top: CELL_HEIGHT / 10, height: 200 }}
            >
                <View style={{ flex: 1, padding: SPACING }}>
                    <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderTopRightRadius: 15, borderBottomRightRadius: 15, borderLeftColor: color, borderLeftWidth: 3}]}/>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={styles.name}>{item.medicineName}</Text>
                            <Text style={styles.medicineType}>{item.medicineType}</Text>    
                        </View>
                        <Text style={[styles.name, {color: color, fontSize: 18, top: 20, fontFamily: 'Sora-SemiBold', position: 'absolute', right: 0}]}>{item.medicineLevel}</Text>
                    </View>
                    <View style={{borderBottomColor: '#9D9D9D', borderBottomWidth: 1, top: 25, marginBottom: 15}} />
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 18, paddingTop: 35, opacity: 0.8, color: 'white', fontFamily: 'Sora-SemiBold'}}>Expiration Date</Text>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', fontFamily: 'Sora-SemiBold', paddingTop: 10}}>{item.medicineExpiry}</Text>
                        </View>
                        <View style={{position: 'absolute', right: 0}}>
                            <Text style={{fontSize: 18, paddingTop: 35, opacity: 0.8, color: 'white', fontFamily: 'Sora-SemiBold'}}>Quantity</Text>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', fontFamily: 'Sora-SemiBold', paddingTop: 10}}>{item.medicineQuantity}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    
    return (
        <>
            {/* THIS BLOCK IS FOR HOMESCREEN ONLY */}
            <View style={props.homepage ? styles.showHeader : styles.hide}>
                <Text style={{fontSize: 25, fontFamily: 'Sora-Bold', top: CELL_HEIGHT / 10, color: 'white', padding: SPACING}}>
                    My Medicine
                </Text>
                <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => navigation.navigate('MedicineTab')}>
                    <Text style={{ fontSize: 18, lineHeight: CELL_HEIGHT * 0.55, fontFamily: 'Sora-Bold', color: '#F4F3BE'}}>
                        See All
                    </Text>
                </TouchableOpacity>
            </View>
            
            {/* SEARCH BAR */}
            <View style={props.homepage ? styles.hide : styles.searchBar}>
                <SearchBar
                    containerStyle={{backgroundColor: defaultBackground, borderTopWidth: 0, borderBottomWidth: 0, width: width - 50}}
                    inputContainerStyle={{backgroundColor: '#F6F6F4'}}
                    round
                    searchIcon={{ size: 25 }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Search Medicine"
                    value={search}
                />
                <TouchableOpacity>
                    <MaterialIcons name="playlist-add" size={40} color="white" onPress={() => navigation.navigate('Medicine', {screen: 'MedicineForm'})}/>
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={ItemView}
            />
        </>
    );
};