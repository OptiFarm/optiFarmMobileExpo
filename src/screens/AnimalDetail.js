import * as React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

// Components
import GoBack from '../components/atoms/GoBack';
import MedicationButton from '../components/atoms/MedicationButton';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../config/theme';

// Sizing
const TOP_HEADER_HEIGHT = height * 0.3;
import {CELL_HEIGHT} from '../components/molecules/AnimalList';

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
    },
    key: {
        fontSize: 15, 
        paddingTop: 20, 
        color: 'grey', 
        fontFamily: 'RobotoMono_700Bold'
    },
    value: {
        fontSize: 15, 
        paddingTop: 20, 
        color: 'white', 
        fontFamily: 'RobotoMono_700Bold'
    }
});

export default function AnimalDetail ({ navigation, route }) {
    const { item } = route.params;
    const array = []
    array.push(item)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <GoBack />
            <Text style={styles.name}>ID: {item.animal_id}</Text>
            <Text style={styles.group}>Group: {item.animal_group}</Text>
            <MedicationButton />

            <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                data={array}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={({ item }) => {
                    return (
                        <>
                        <View style={{paddingBottom: SPACING * 5}}>
                            <Text style={{fontSize: 20, paddingBottom: SPACING ,color: 'grey', fontFamily: 'RobotoMono_700Bold'}}>Description</Text>
                            <Text style={{fontSize: 15, color: 'white', fontFamily: 'RobotoMono_700Bold'}}>This is a description</Text>
                        </View>
                        <View 
                            style={{ marginBottom: CELL_HEIGHT / 10, top: 0, height: CELL_HEIGHT * 1.4}}
                            >
                            <View style={{ flex: 1, padding: SPACING }}>
                                <View style={[StyleSheet.absoluteFillObject,
                                    { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Tag No</Text>
                                            <Text style={styles.key}>Sex</Text>
                                            <Text style={styles.key}>Date of Birth</Text>
                                            <Text style={styles.key}>Breed</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.animal_tag}</Text>
                                            <Text style={styles.value}>{item.animal_sex}</Text>
                                            <Text style={styles.value}>{item.animal_dob}</Text>
                                            <Text style={styles.value}>{item.animal_breed}</Text>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        <View 
                            style={{ marginBottom: CELL_HEIGHT / 10, top: 0, height: CELL_HEIGHT * 1.4}}
                            >
                            <View style={{ flex: 1, padding: SPACING }}>
                                <View style={[StyleSheet.absoluteFillObject,
                                    { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Vaccination</Text>
                                            <Text style={styles.key}>Doesing</Text>
                                            <Text style={styles.key}>Medication</Text>
                                            <Text style={styles.key}>View Proginy</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.animal_vaccine}</Text>
                                            <Text style={styles.value}>{item.animal_doesing}</Text>
                                            <Text style={styles.value}>{item.animal_medication}</Text>
                                            <Text style={styles.value}>Click Here</Text>
                                        </View>
                                </View>
                            </View>
                        </View>
                        </>
                    )
                }}
            /> 
        </SafeAreaView>
    )
}