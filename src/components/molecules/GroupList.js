import React from 'react';
import {useNavigation} from '@react-navigation/core'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

// Components
import { Input } from '@ui-kitten/components';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';

// Data
import { groupData } from '../../config/data/Animal';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// Sizing
export const CELL_HEIGHT = height * 0.18;
export const CELL_WIDTH = width * 0.64;
const FULL_SIZE = CELL_WIDTH + SPACING * 2;

const styles = StyleSheet.create({
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
    name: {
        fontSize: 20,
        fontFamily: 'RobotoMono_700Bold',
        color: 'white',
        paddingTop: 5
    },
    groupSub: {
        fontSize: 15,
        opacity: 0.7,
        top: 6,
        color: 'white',
        fontFamily: 'RobotoMono_700Bold',
        paddingTop: SPACING,
        paddingLeft: 10
    },
});

export default function GroupList () {
    const navigation = useNavigation()
    return (
        <>
            <View style={{flexDirection: 'row'}}>
                <Input
                    // onChangeText={this.handleSearch}
                    style={styles.searchInput}
                    size='large'
                    placeholder='Search for Group'
                    textStyle={{height: 35}}
                />
                <TouchableOpacity>
                    <Ionicons name="add-circle-outline" size={45} color="white" style={styles.addIcon} onPress={() => navigation.navigate('GroupForm')} />
                </TouchableOpacity>
            </View>

            {/* Group Cards */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={groupData}
                snapToInterval={FULL_SIZE}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={({ item }) => {

                return (
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('GroupDetail', {item})}
                    style={{ marginBottom: 20, top: CELL_HEIGHT / 10, height: 240 }}
                  >
                  <View style={{ flex: 1, padding: SPACING}}>
                      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <Text style={styles.name}>{item.groupName}</Text>
                          <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons name="cow" style={{top: CELL_HEIGHT / 11}} size={25} color="white" />
                            <Text style={styles.groupSub}>{item.groupAmount} Animals</Text> 
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons name="clock-time-five-outline" style={{top: CELL_HEIGHT / 11}} size={25} color="white" />
                            <Text style={styles.groupSub}>{item.GroupDateCreated}</Text> 
                          </View>
                          <Text style={{fontSize: 15, color: 'white', fontFamily: 'RobotoMono_700Bold', paddingTop: 40, paddingLeft: 0 }}>Note</Text>  
                          <Text style={{fontSize: 15, color: 'white', opacity: 0.7, fontFamily: 'RobotoMono_700Bold', paddingTop: 10, paddingLeft: 0 }}>{item.GroupNote}</Text>  
                        </View>
                      </View>
                      <Ionicons name="chevron-forward-outline" size={35} color="white" style={{alignSelf: 'flex-end', position: 'absolute', top: 0, padding: SPACING}} />
                  </View>
                </TouchableOpacity>
                );
              }}
            />
        </>
    )
}
