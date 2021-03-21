import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

// DATA
import { groupData } from '../../config/data/Animal';

// THEME
import { SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// SIZING
const CELL_WIDTH = width * 0.64;
const CELL_HEIGHT = height * 0.35;
const FULL_SIZE = CELL_WIDTH + SPACING * 2;

const styles = StyleSheet.create({
    name: {
        fontSize: 25,
        fontFamily: 'Sora-SemiBold',
        color: 'white',
        paddingTop: 5
    },
    groupSub: {
        fontSize: 17,
        top: 17,
        color: 'white',
        fontFamily: 'Sora-SemiBold',
        paddingTop: SPACING,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
    }
});

export default function GroupList (props) {

    // NAVIGATION
    const navigation = useNavigation()

    // SEARCH FUNCTIONS
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        setFilteredDataSource(groupData);
        setMasterDataSource(groupData);
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) { 
                const itemData = item.groupName ? item.groupName.toUpperCase() : ''.toUpperCase();
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
            onPress={() => navigation.navigate('Group', {screen: 'GroupDetail', params: {item}})}
            style={{ marginBottom: 20, height: CELL_HEIGHT }}
          >
            <View style={{ flex: 1, padding: SPACING}}>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={styles.name}>{item.groupName}</Text>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.groupSub}>{item.groupAmount} Animals</Text> 
                    </View>
                    <Text style={{fontSize: 17, color: 'white', fontFamily: 'Sora-SemiBold', paddingTop: 60, paddingLeft: 0 }}>Note</Text>  
                    <Text style={{fontSize: 17, color: 'white', fontFamily: 'Sora-SemiBold', paddingTop: 10, paddingLeft: 0 }}>{item.GroupNote}</Text>  
                  </View>
                </View>
                <Ionicons name="chevron-forward-outline" size={35} color="white" style={{alignSelf: 'flex-end', position: 'absolute', padding: SPACING}} />
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
            placeholder="Search Group"
            value={search}
        />
        <TouchableOpacity>
            <MaterialIcons name="playlist-add" size={40} color="white" onPress={() => navigation.navigate('Group', {screen: 'GroupForm'})}/>
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
