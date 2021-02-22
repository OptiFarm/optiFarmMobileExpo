import * as React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';

// Components
import { Button } from '@ui-kitten/components';
import { EditButton } from '../components/atoms/EditButton';
import { BackButton } from '../components/atoms/BackButton'

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
        color: 'white',
    },
    group: {
        fontSize: 20,
        fontWeight: '700',
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - SPACING * 6,
        left: SPACING,
        color: 'white'
    },
    key: {
        fontSize: 15, 
        paddingTop: 23, 
        color: 'grey', 
        fontFamily: 'RobotoMono_700Bold'
    },
    value: {
        fontSize: 15, 
        paddingTop: 23, 
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
            <BackButton goBack={navigation.goBack} />
            <Text style={styles.name}>ID: {item.animal_id}</Text>
            <Text style={styles.group}>Group: {item.animal_group}</Text>
            {/* <EditButton /> */}

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
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{padding: SPACING}}>
                                    <Text style={{color: 'grey', fontSize: 17, fontFamily: 'RobotoMono_700Bold'}}>Note</Text>
                                </View>
                                <Button status='info' style={{borderRadius: 20, width: 100, position: 'absolute', right: 0, right: SPACING}}>
                                    Edit
                                </Button>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{padding: SPACING}}>
                                    <Text style={{color: 'white', fontSize: 17, fontFamily: 'RobotoMono_700Bold'}}>Lorem Ipsum</Text>
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