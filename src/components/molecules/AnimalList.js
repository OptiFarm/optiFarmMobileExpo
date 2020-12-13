import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import {useNavigation} from '@react-navigation/core'
import { Ionicons } from '@expo/vector-icons'; 

// Components
import { Icon, Button, Input } from '@ui-kitten/components';

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
    scanIcon: {
        top: CELL_HEIGHT / 5,
        left: width / 30
    }
});

export default function AnimalList ({props}) {
    const navigation = useNavigation()
    return (
        <>
            <View style={{flexDirection: 'row'}}>
                <Input
                    placeholder='Search Animal' 
                    // onChangeText={this.handleSearch}
                    style={styles.searchInput}
                    size='large'
                    placeholder='Search for Animal'
                    textStyle={{height: 35}}
                />
                <TouchableOpacity>
                    <Ionicons name="scan-outline" size={45} color="white" style={styles.scanIcon} />
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={AnimalData}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={({ item }) => {
                    return (
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
                    )
                }}
            /> 
        </>
    );
};