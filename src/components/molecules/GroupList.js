import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import {useNavigation} from '@react-navigation/core'
import { Ionicons } from '@expo/vector-icons'; 

// Components
import { Input } from '@ui-kitten/components';

// Data
import { groupData } from '../../config/data/Animal';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// Sizing
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
    searchInput: {
        padding: SPACING, 
        top: CELL_HEIGHT / 10, 
        borderRadius: 10, 
        backgroundColor: 'white', 
        width: width, 
        borderColor: defaultBackground
    },
    addIcon: {
        left: SPACING * 30,
        top: 0
    },
    name: {
        fontSize: 18,
        fontFamily: 'RobotoMono_700Bold',
        color: 'white',
        paddingTop: 5
    },
    groupSub: {
        fontSize: 15,
        opacity: 0.7,
        top: 5,
        color: 'white',
        fontFamily: 'RobotoMono_700Bold',
        paddingTop: SPACING
    },
});

export default function GroupList () {
    const navigation = useNavigation()
    return (
        <>
            <View style={{flexDirection: 'row'}}>
                <Input
                    placeholder='Search Animal' 
                    // onChangeText={this.handleSearch}
                    style={styles.searchInput}
                    size='large'
                    placeholder='Search for Group'
                    textStyle={{height: 35}}
                />
            </View>

            {/* Group Cards */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={groupData}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={({ item }) => {

                return (
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('GroupDetail', {item})}
                    style={{ marginBottom: CELL_HEIGHT / 10, height: 180 }}
                  >
                  <View style={{ flex: 1, padding: 15}}>
                      <View style={[StyleSheet.absoluteFillObject,
                          { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <Text style={styles.name}>{item.groupName}</Text>
                          <Text style={styles.groupSub}>{item.groupAmount} Animals</Text> 
                          <Text style={styles.groupSub}>{item.GroupDateCreated}</Text>     
                          <Text style={styles.groupSub}>{item.GroupNote}</Text>     
                        </View>
                      </View>
                  </View>
                </TouchableOpacity>
                );
              }}
            ></FlatList>
        </>
    )
}
