import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// THEME
import { SPACING, width, height, cardBackground } from '../../config/theme';

// SIZING
const CELL_HEIGHT = height * 0.35;

const styles = StyleSheet.create({
    name: {
        fontSize: 25,
        fontFamily: 'Sora-Bold',
        color: '#F3F4B8',
        paddingTop: SPACING,
        textAlign: 'center',
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
        textAlign: 'center',
    },
});

export const GroupItemView = ({ navigation, item }) => {
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Group', {screen: 'GroupDetail', params: {item}})}
            style={{ marginBottom: 20, height: 180, marginLeft: 'auto', marginRight: 'auto', width: 180 }}
        >
            <View style={{ flex: 1, padding: SPACING, top: SPACING}}>
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderRadius: 15}]}/>
                <Text style={styles.name}>{item.group_name}</Text>
                <Text style={styles.groupDesc}>7 Cows</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={35} color="white" style={{bottom: 0, right: 0, position: 'absolute',}} />
        </TouchableOpacity>
    );
}