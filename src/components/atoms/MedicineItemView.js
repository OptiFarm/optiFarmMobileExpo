import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Image } from 'react-native';

// DATA
import MedicineData from '../../config/data/Medicine';

// THEME
import { SPACING, width, height, defaultBackground, cardBackground, CELL_HEIGHT, medicineLevelLow, medicineLevelMedium, medicineLevelHigh } from '../../config/theme';

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

export const MedicineItemView = ({ navigation, item }) => {

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
}