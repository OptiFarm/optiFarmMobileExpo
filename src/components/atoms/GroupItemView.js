import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

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
    groupLabel: {
        fontSize: 18, 
        paddingTop: 35, 
        color: 'white', 
        opacity: 0.8, 
        fontFamily: 'Sora-SemiBold',
    },
    groupDesc: {
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

export const GroupItemView = ({ navigation, item }) => {
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Group', {screen: 'GroupDetail', params: {item}})}
            style={{ marginBottom: 20, height: CELL_HEIGHT }}
        >
            <View style={{ flex: 1, padding: SPACING, top: SPACING}}>
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderRadius: 15}]}/>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.name}>{item.groupName}</Text>
                    <Ionicons name="chevron-forward-outline" size={35} color="white" style={{right: 0, position: 'absolute', padding: SPACING}} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.groupLabel}>Animal Count</Text>
                        <Text style={styles.groupDesc}>{item.groupAmount}</Text>
                    </View>
                </View>
                <Text style={styles.groupLabel}>Note</Text>
                <Text style={styles.groupDesc}>{item.GroupNote}</Text>
            </View>
        </TouchableOpacity>
    );
}