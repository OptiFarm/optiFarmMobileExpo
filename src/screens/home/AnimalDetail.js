import React from "react";
import { MaterialIcons, Feather } from '@expo/vector-icons'; 

// COMPONENTS
import { 
    SafeAreaView, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    Image,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-paper';

// THEME
import { 
    SPACING, 
    height, 
    defaultBackground, 
    cardBackground, 
    topOS,
    CELL_HEIGHT
} from '../../config/theme';

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        fontFamily: 'Sora-Bold',
        color: 'white',
        textAlign: 'center'
    },
    key: {
        fontSize: 18, 
        paddingTop: 23, 
        color: 'white', 
        opacity: 0.8,
        fontFamily: 'Sora-SemiBold'
    },
    value: {
        fontSize: 18, 
        paddingTop: 23, 
        color: 'white', 
        fontFamily: 'Sora-SemiBold'
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: topOS,
        alignItems: 'center'
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        left: SPACING,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: SPACING
    },
});

export default function AnimalDetail ({ navigation, route }) {
    const { item, date_of_birth, cowLogo } = route.params;

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground, flex: 1}}>

            {/* HEADER */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.tag_number} 
                </Text>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home', {screen: 'EditAnimalForm', params: {item}})}>
                        <MaterialIcons name="edit" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{fontSize: 20, fontFamily: 'Sora-Bold', alignItems: 'center', color: 'white', paddingBottom: SPACING}}>
                <Image source={{ uri: cowLogo }} style={{ height: 40, width: 40 }}/>
            </View>

            {/* CONTENT */}
            <ScrollView style={{padding: SPACING, marginBottom: SPACING}}>
                <Button
                    contentStyle={{height: 50, width: 25, }} 
                    icon="pill" 
                    mode="contained" 
                    color='#F4F3BE' 
                    style={{marginTop: SPACING, borderRadius: 10}} 
                    contentStyle={{height: 50}} 
                    labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                >
                    Give Medication
                </Button>
                {/* DETAILS */}
                <View style={{marginBottom: CELL_HEIGHT / 10, marginTop: 30, height: 325}} >
                    <View style={{flex: 1, padding: SPACING}}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={styles.key}>Herd No</Text>
                                    <Text style={styles.key}>Sire Number</Text>
                                    <Text style={styles.key}>Mother Number</Text>
                                    <Text style={styles.key}>Sex</Text>
                                    <Text style={styles.key}>Date of Birth</Text>
                                    <Text style={styles.key}>Breed</Text>
                                </View>
                                <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                    <Text style={styles.value}>{item.herd_number}</Text>
                                    <Text style={styles.value}>{item.sire_number}</Text>
                                    <Text style={styles.value}>{item.mother_number}</Text>
                                    <Text style={styles.value}>{item.male_female}</Text>
                                    <Text style={styles.value}>{date_of_birth}</Text>
                                    <Text style={styles.value}>{item.breed_type}</Text>
                                </View>
                            </View>
                    </View>
                </View>
                <View style={{marginBottom: CELL_HEIGHT / 10, height: 280}}>
                    <View style={{flex: 1, padding: SPACING}}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={styles.key}>Pure Breed</Text>
                                    <Text style={styles.key}>Vaccination</Text>
                                    <Text style={styles.key}>Doesing</Text>
                                    <Text style={styles.key}>Medication</Text>
                                    <Text style={styles.key}>View Progeny</Text>
                                </View>
                                <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                    <Text style={styles.value}>{item.pure_breed.toString()}</Text>
                                    <Text style={styles.value}>{item.animal_vaccine}</Text>
                                    <Text style={styles.value}>{item.animal_doesing}</Text>
                                    <Text style={styles.value}>{item.animal_medication}</Text>
                                    <TouchableOpacity>
                                        <Text style={[styles.value, {color: '#F4F3BE'}]}><Feather name='info' size={18} color='#F4F3BE'/> Click Here</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                </View>
                <Text style={{fontSize: 18, fontFamily: 'Sora-SemiBold', color: '#F4F3BE', paddingVertical: SPACING}}>Description</Text>
                <View style={{marginBottom: CELL_HEIGHT / 10, height: 150}}>
                    <View style={{flex: 1, padding: SPACING}}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={styles.key}>{item.description}</Text>
                                </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
}