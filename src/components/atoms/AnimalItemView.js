import React from 'react';

// COMPONENTS
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

// THEME
import { SPACING, width, height, cardBackground, CELL_HEIGHT } from '../../config/theme';

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontFamily: 'Sora-SemiBold',
        color: 'white',
        paddingTop: SPACING,
    },
    animalType: {
        fontSize: 18,
        top: 5,
        opacity: 0.8,
        color: 'white',
        fontFamily: 'Sora-SemiBold',
    },
    animalLabel: {
        fontSize: 18, 
        paddingTop: 35, 
        color: 'white', 
        opacity: 0.8, 
        fontFamily: 'Sora-SemiBold',
    },
    animalDesc: {
        color: 'white', 
        fontSize: 18, 
        fontFamily: 'Sora-SemiBold',
        top: 5,
    },
    border: {
        borderBottomColor: '#9D9D9D',
        opacity: 0.3, 
        borderBottomWidth: 1, 
        top: 20,
    },
});

export const AnimalItemView = ({ navigation, item }) => {

    // COW LOGO
    const cowLogo = item.animal_sex === 'Male' ? 'https://i.ibb.co/NnqjqXC/maleCow.png' : 'https://i.ibb.co/V989V52/female-Cow.png';

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Home', {screen: 'AnimalDetail', params: {item}})}
            style={{ marginBottom: CELL_HEIGHT / 10, top: CELL_HEIGHT / 10, height: 265 }}
        >
            <View style={{ flex: 1, padding: SPACING }}>
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderRadius: 15}]}/>

                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.name}>ID: <Text style={{color: '#F4F3BE'}}>{item.animal_id}</Text></Text>
                        <Text style={styles.animalType}>{item.animal_type}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 0, top: SPACING}}>
                        <Image source={{ uri: cowLogo }} style={{ height: 40, width: 40 }}/>
                    </View>
                </View>
                <View style={styles.border}/>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.animalLabel}>Sex</Text>
                        <Text style={styles.animalDesc}>{item.animal_sex}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 0}}>
                        <Text style={styles.animalLabel}>Breed</Text>
                        <Text style={[styles.animalDesc, {position: 'absolute', right: 0, top: 63,}]}>{item.animal_breed}</Text>
                    </View>
                </View>
                <Text style={styles.animalLabel}>Date of Birth</Text>
                <Text style={styles.animalDesc}>{item.animal_dob}</Text>
            </View>
        </TouchableOpacity>
    );
}