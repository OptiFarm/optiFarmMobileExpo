import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { getStatusBarHeight } from 'react-native-status-bar-height'

// COMPONENTS
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Platform, FlatList } from 'react-native';
import { AnimalItemView } from '../../components/atoms/AnimalItemView';

// THEME
import { SPACING, width, height, defaultBackground, cardBackground, CELL_HEIGHT } from '../../config/theme';

// SIZING
const TOP_HEADER_HEIGHT = height * 0.3;

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        fontFamily: 'Sora-Bold',
        color: 'white',
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
            <View style={[styles.navBar, {marginTop: Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight() - 20}]}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.groupName} 
                </Text>
                <View style={styles.rightContainer}>
                </View>
            </View>
            <Text style={{fontSize: 20, fontFamily: 'Sora-Bold', textAlign: 'center', color: 'white', paddingBottom: SPACING}}>
                {item.groupAmount} Animals
            </Text>
            {/* <FlatList
                style={{marginBottom: 30}}
                showsVerticalScrollIndicator={false}
                data={AnimalData}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({item}) => <AnimalItemView item={item} navigation={navigation} />} 
            />  */}
        </SafeAreaView>
    )
}