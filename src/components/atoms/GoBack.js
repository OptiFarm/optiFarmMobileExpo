import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/core'
import { Ionicons } from '@expo/vector-icons'; 

// Components


// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// Sizing
const TOP_HEADER_HEIGHT = height * 0.3

const styles = StyleSheet.create({
    icon: {
      top: TOP_HEADER_HEIGHT - SPACING * 18.5,
      left: width / 40
    }
});

export default function GoBack() {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => {
            navigation.goBack()
            }}>
                <Ionicons name="arrow-back-outline" size={35} color="white" style={styles.icon} />
        </TouchableOpacity>
    )
}