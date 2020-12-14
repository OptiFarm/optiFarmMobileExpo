import * as React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 

// Components
import GoBack from '../components/atoms/GoBack';

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
        top: TOP_HEADER_HEIGHT / 1.5
    },
    medicatedIcon: {
        top: TOP_HEADER_HEIGHT / 1.5,
        left: SPACING * 5
    }
});


export default function MedicineDetail ({ navigation, route }) {
    const { item } = route.params;
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
            <GoBack />
            
            <Text style={styles.name}>
                {item.medicineName}
            </Text>

            {/* First Section */}
            <View style={{flexDirection: 'row', zIndex: -1, elevation: -1}}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Entypo name="heart-outlined" size={35} color="white" style={styles.medicatedIcon} />
                        <Text style={{fontSize: 35, color: 'white', top: TOP_HEADER_HEIGHT / 1.55, left: SPACING * 6, fontFamily: 'RobotoMono_700Bold'}}>7</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, color: 'white', top: TOP_HEADER_HEIGHT / 1.55, left: SPACING * 2, fontFamily: 'RobotoMono_700Bold'}}>Animals Medicated</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'column', left: SPACING * 6}}>
                    <View style={{flexDirection: 'row'}}>
                        <Fontisto name="injection-syringe" size={35} color="white" style={styles.medicatedIcon} />
                        <Text style={{fontSize: 35, color: 'white', top: TOP_HEADER_HEIGHT / 1.55, left: SPACING * 6, fontFamily: 'RobotoMono_700Bold'}}>2</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, color: 'white', top: TOP_HEADER_HEIGHT / 1.55, left: SPACING * 2, fontFamily: 'RobotoMono_700Bold'}}>Mililitres Left</Text>
                    </View>
                </View>
            </View>






        </SafeAreaView>
    )
}