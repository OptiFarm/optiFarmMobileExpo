import * as React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

// Components
import GoBack from '../components/atoms/GoBack'

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../config/theme';

// Sizing
const TOP_HEADER_HEIGHT = height * 0.3
import {CELL_HEIGHT} from '../components/molecules/AnimalList'

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: '700',
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - SPACING * 10,
        left: SPACING,
        color: 'white'
    },
    group: {
        fontSize: 20,
        fontWeight: '700',
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - SPACING * 6,
        left: SPACING,
        color: 'white'
    },
    icon: {
        width: 35,
        height: 35,
        top: TOP_HEADER_HEIGHT - SPACING * 18.5,
        left: 10
    },
    bg: {
        backgroundColor: defaultBackground,
        transform: [{translateY: 230}],
        borderRadius: 32,
        padding: SPACING
    },
    card1: {
        backgroundColor: cardBackground,
        flexDirection: 'row', 
        marginBottom: 10,
        height: height / 3.8,
        borderRadius: 15
    },
    button: {
        fontSize: 20,
        fontWeight: '700',
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - SPACING * 3,
        left: SPACING,
        backgroundColor: cardBackground,
        borderRadius:15
    }
});

export default function AnimalDetail ({navigation, route}) {
    const { item } = route.params
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <GoBack />

            {/* Animal Title */}
            <Text style={styles.name}>ID: {item.animal_id}</Text>
            <Text style={styles.group}>Group: {item.animal_group}</Text>
            
            {/* Inside Card */}
            
        </SafeAreaView>
    )
}