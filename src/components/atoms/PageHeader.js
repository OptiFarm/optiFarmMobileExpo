import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/core'

// COMPONENTS
import { StyleSheet, Text, Platform, TouchableOpacity, View } from 'react-native';

// THEME
import { cardBackground, SPACING, topOS } from '../../../src/config/theme'

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        fontFamily: 'Sora-Bold',
        color: 'white',
        textAlign: 'center'
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: topOS,
        alignItems: 'center',
        padding: SPACING
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

interface headerProps {
    label: String;
    showChevron: String;
    showSearch: String;
    whereScreen: String;
}

export const PageHeader = ({label, goBack, showChevron, showSearch, whereScreen}: headerProps) => {
    const navigation = useNavigation()

    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={goBack} style={{display: showChevron === 'true' ? 'flex' : 'none'}}>
                <MaterialIcons name="arrow-back-ios" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.name}>
                {label}
            </Text>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={{display: showSearch === 'true' ? 'flex' : 'none', width: 44, height: 44, borderRadius: 15, backgroundColor: '#E4E5E9',}} 
                    onPress={() => navigation.navigate('Home', {screen: 'SearchScreen', params: {for: whereScreen}})}
                >
                    <MaterialIcons name="search" size={30} color={cardBackground} style={{top: 7, left: 8}} />
                </TouchableOpacity>
            </View>
        </View>
    )
};