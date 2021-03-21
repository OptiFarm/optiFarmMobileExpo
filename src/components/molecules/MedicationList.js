import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { MaterialIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

// DATA
import { medicatedAnimalData } from '../../config/data/Medicine'

// THEME
import { SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// SIZING
const CELL_WIDTH = width * 0.64;
const CELL_HEIGHT = height * 0.35;
const FULL_SIZE = CELL_WIDTH + SPACING * 2;

const styles = StyleSheet.create({
    name: {
        fontSize: 25,
        fontFamily: 'Sora-Bold',
        color: '#F3F4B8',
        paddingTop: SPACING,
    },
    medicineType: {
        fontSize: 18,
        top: 5,
        opacity: 0.8,
        color: 'white',
        fontFamily: 'Sora-SemiBold',
    },
    medicineLabel: {
        fontSize: 18, 
        paddingTop: 35, 
        color: 'white', 
        opacity: 0.8, 
        fontFamily: 'Sora-SemiBold',
    },
    medicineDesc: {
        color: 'white', 
        fontSize: 18, 
        fontFamily: 'Sora-Bold',
        top: 5,
    },
    border: {
        borderBottomColor: '#9D9D9D', 
        borderBottomWidth: 1, 
        top: 20,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
    }
});

export default function Medication (props) {

    // NAVIGATION
    const navigation = useNavigation()

    // SEARCH FUNCTIONS
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        setFilteredDataSource(medicatedAnimalData);
        setMasterDataSource(medicatedAnimalData);
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) { 
                const itemData = item.medication ? item.medication.toUpperCase() : ''.toUpperCase();
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
            onPress={() => {}}
            style={{ marginBottom: 20, height: CELL_HEIGHT }}
            >
            <View style={{ flex: 1, padding: SPACING, height: height - 50, top: SPACING}}>
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderRadius: 15}]}/>

                <Text style={styles.name}>{item.medication}</Text>
                <Text style={styles.medicineType}>Medicament</Text>

                <View style={styles.border}/>

                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.medicineLabel}>Animal ID</Text>
                        <Text style={[styles.medicineDesc, {color: '#F3F4B8'}]}>{item.animal}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 0}}>
                        <Text style={styles.medicineLabel}>Date of Administration</Text>
                        <Text style={[styles.medicineDesc, {position: 'absolute', right: 0, top: 60,}]}>21 March 2021</Text>
                    </View>
                </View>

                <Text style={styles.medicineLabel}>Withdrawal Period</Text>
                <Text style={[styles.medicineDesc, {color: '#D74747'}]}>{item.withdrawalPeriod}</Text>

            </View>
        </TouchableOpacity>
      );
  };

  return (
      <>
      {/* SEARCH BAR */}
      <View style={props.homepage ? styles.hide : styles.searchBar}>
        <SearchBar
            containerStyle={{backgroundColor: defaultBackground, borderTopWidth: 0, borderBottomWidth: 0, width: width - 50}}
            inputContainerStyle={{backgroundColor: '#F6F6F4'}}
            round
            searchIcon={{ size: 25 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Search Medication"
            value={search}
        />
        <TouchableOpacity>
            <MaterialIcons name="playlist-add" size={40} color="white" onPress={() => navigation.navigate('GroupForm')}/>
        </TouchableOpacity>
      </View>

      {/* Group Cards */}
      <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredDataSource}
          snapToInterval={FULL_SIZE}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ padding: SPACING }}
          renderItem={ItemView}
      />
      </>
  )
}
