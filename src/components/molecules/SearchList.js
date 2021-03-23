import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { MaterialIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

// ITEM VIEWS
import { AnimalItemView } from '../../components/atoms/AnimalItemView';
import { MedicineItemView } from '../../components/atoms/MedicineItemView';
import { GroupItemView } from '../../components/atoms/GroupItemView';

// DATA
import AnimalData from '../../config/data/Animal';
import MedicineData from '../../config/data/Medicine';
import { groupData } from '../../config/data/Animal';

// THEME
import { SPACING, width, defaultBackground, cardBackground } from '../../config/theme';

const styles = StyleSheet.create({
    hideList: {
        display: 'none',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default function SearchList (props) {
    
    const where = props.for

    // DATA SELECTION
    const data = where === 'HerdBook' ? AnimalData 
    : where === 'MedicineList' ? MedicineData 
    : groupData 

    // NAVIGATION
    const navigation = useNavigation()

    // SEARCH FUNCTIONS
    const searchPlaceholder = where === 'HerdBook' ? 'Search Animal' 
    : where === 'MedicineList' ? 'Search Medicine'
    : 'Search Group'

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        setFilteredDataSource(data);
        setMasterDataSource(data);
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const searchTerm = where === 'HerdBook' ? item.animal_id 
                : where === 'MedicineList' ? item.medicineName
                : item.groupName
                const itemData = searchTerm ? searchTerm.toUpperCase() : ''.toUpperCase();
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

    return (
        <>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING, marginTop: 45, marginBottom: 30}}>
                <TouchableOpacity style={{left: 0}} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <SearchBar
                    containerStyle={{backgroundColor: defaultBackground, borderTopWidth: 0, borderBottomWidth: 0, width: width - 60, position: 'absolute', right: SPACING}}
                    inputContainerStyle={{backgroundColor: '#E4E5E9',}}
                    inputStyle={{color: cardBackground, fontFamily: 'Sora-SemiBold'}}
                    round
                    searchIcon={null}
                    placeholder={searchPlaceholder}
                    clearIcon={true}
                    value={search}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    autoFocus={true}
                />
            </View>
            <FlatList
                style={props.homescreen ? styles.hideList : {marginBottom: 30}}
                showsVerticalScrollIndicator={false}
                data={filteredDataSource}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({item}) => props.for === 'HerdBook' ? <AnimalItemView item={item} navigation={navigation} />
                                        : props.for === 'MedicineList' ? <MedicineItemView item={item} navigation={navigation} />
                                        : <GroupItemView item={item} navigation={navigation} />
                } 
            /> 
        </>
    );
};