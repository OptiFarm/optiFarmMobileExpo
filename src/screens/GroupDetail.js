import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { getStatusBarHeight } from 'react-native-status-bar-height'

// COMPONENTS
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AnimalList from '../components/molecules/AnimalList'

// THEME
import { SPACING, width, height, defaultBackground, cardBackground } from '../config/theme';

// SIZING
const TOP_HEADER_HEIGHT = height * 0.3;
import {CELL_HEIGHT} from '../components/molecules/AnimalList';

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        fontFamily: 'RobotoMono_700Bold',
        color: 'white',
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        left: SPACING
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: SPACING
    },
});

export default function GroupDetail ({ navigation, route }) {
    const { item } = route.params;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.groupName} 
                </Text>
                <TouchableOpacity style={styles.rightContainer}>
                    <MaterialIcons name="playlist-add" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 20, fontFamily: 'RobotoMono_700Bold', textAlign: 'center', color: '#6A7E89', paddingBottom: 50}}>
                {item.groupAmount} Animals
            </Text>
            <AnimalList /> 
        </SafeAreaView>
    )
}