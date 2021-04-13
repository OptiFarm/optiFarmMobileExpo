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
        textAlign: 'center',
        paddingLeft: 5
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
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
        </View>
    )
};