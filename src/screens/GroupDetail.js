import * as React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

// Components
import GoBack from '../components/atoms/GoBack';
import { Input, Button } from '@ui-kitten/components';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../config/theme';

// Sizing
const TOP_HEADER_HEIGHT = height * 0.3;
import {CELL_HEIGHT} from '../components/molecules/AnimalList';

const styles = StyleSheet.create({
    name: {
        fontSize: 35,
        fontFamily: 'RobotoMono_700Bold',
        position: 'absolute',
        left: SPACING,
        color: 'white',
        top: TOP_HEADER_HEIGHT / 1.5,
    },
    searchInput: {
        padding: SPACING, 
        top: CELL_HEIGHT, 
        borderRadius: 10, 
        backgroundColor: 'white', 
        width: width / 1.30, 
        borderColor: defaultBackground
    },
    button: {
        borderRadius: 10, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

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

export default function GroupDetail ({ navigation, route }) {
    const { item } = route.params;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <GoBack />
            <Text style={styles.name}>
                {item.groupName} 
            </Text>

            <View style={{flexDirection: 'row', top: TOP_HEADER_HEIGHT / 1.5, paddingBottom: CELL_HEIGHT / 2.5}}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="cow" style={{top: 0, left: 15}} size={35} color="white" />
                        <Text style={{fontSize: 35, color: 'white', left: 30, fontFamily: 'RobotoMono_700Bold'}}>7</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, color: 'white', left: SPACING * 2, fontFamily: 'RobotoMono_700Bold'}}>Animals</Text>
                    </View>
                </View>
            </View> 
            <View>
                <Input
                    // onChangeText={this.handleSearch}
                    style={styles.searchInput}
                    size='large'
                    placeholder='Search for Animal'
                    textStyle={{height: 35}}
                />
            </View>
            <View style={{flexDirection: 'column'}}>
                <Button style={styles.button}>
                    <Text style={{color: 'white', fontSize: 17, fontFamily: 'RobotoMono_700Bold'}}>Use Medication</Text>
                </Button>
            </View>

            


            
        </SafeAreaView>
    )
}