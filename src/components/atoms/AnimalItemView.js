import React from 'react';
import Moment from 'moment';
import { Feather } from '@expo/vector-icons'; 

// COMPONENTS
import { View, StyleSheet, Text, TouchableOpacity, Image, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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
    swipeIcon: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 25,
        top: 115,
    },
});

// SWIPEABLE
const RightActions = ({ progress, dragX, onPress, item }) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.rightAction}>
                <Animated.Text style={[styles.swipeIcon, { transform: [{ scale }] }]}>
                    <Feather name="trash-2" size={60} color="#D74747" />
                </Animated.Text>
            </View>
        </TouchableOpacity>
    );
};

export const AnimalItemView = ({ navigation, item, onRightPress }) => {

    // COW LOGO
    const cowLogo = item.male_female === 'M' ? 'https://i.ibb.co/NnqjqXC/maleCow.png' : 'https://i.ibb.co/V989V52/female-Cow.png';

    // FORMAT DATE TIME
    Moment.locale('en');
    const dt = item.date_of_birth;
    const date_of_birth = Moment(dt).format('YYYY-MM-DD');
    const last_calved = item.last_calved !== null ? Moment(item.last_calved).format('YYYY-MM-DD') : 'N/A';

    return (
        <Swipeable
            renderRightActions={(progress, dragX) => (
                <RightActions progress={progress} dragX={dragX} onPress={onRightPress} item={item}/>
            )}
        >
            <TouchableOpacity 
                onPress={() => navigation.navigate('Home', {screen: 'AnimalDetail', params: {item, date_of_birth, cowLogo, last_calved}})}
                style={{ marginBottom: CELL_HEIGHT / 10, top: CELL_HEIGHT / 10, height: 265 }}
            >
                <View style={{ flex: 1, padding: SPACING }}>
                    <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderRadius: 15}]}/>

                    <View style={{flexDirection: 'row',}}>
                        <View>
                            <Text style={styles.name}>Tag Number: <Text style={{color: '#F4F3BE'}}>{item.tag_number}</Text></Text>
                            {/* <Text style={styles.animalType}></Text> */}
                        </View>
                        <View style={{position: 'absolute', right: 0,}}>
                            <Image source={{ uri: cowLogo }} style={{ height: 40, width: 40 }}/>
                        </View>
                    </View>
                    <View style={styles.border}/>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={styles.animalLabel}>Sex</Text>
                            <Text style={styles.animalDesc}>{item.male_female}</Text>
                        </View>
                        <View style={{position: 'absolute', right: 0}}>
                            <Text style={styles.animalLabel}>Breed</Text>
                            <Text style={[styles.animalDesc, {position: 'absolute', right: 0, top: 63,}]}>{item.breed_type}</Text>
                        </View>
                    </View>
                    <Text style={styles.animalLabel}>Date of Birth</Text>
                    <Text style={styles.animalDesc}>{date_of_birth}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}