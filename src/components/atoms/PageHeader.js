import React from 'react';
import { StyleSheet, Text, Platform, TouchableOpacity, View } from 'react-native';
import { SPACING, topOS } from '../../../src/config/theme'
import { MaterialIcons } from '@expo/vector-icons'; 

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
        right: SPACING
    },
});

interface headerProps {
    label: String;
    showChevron: String;
}

export const PageHeader = ({label, goBack, showChevron}: headerProps) => {
    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={goBack} style={{display: showChevron === 'true' ? 'flex' : 'none'}}>
                <MaterialIcons name="arrow-back-ios" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.name}>
                {label}
            </Text>
            <View style={styles.rightContainer}>
            </View>
        </View>
    )
};