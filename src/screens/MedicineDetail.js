import * as React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons'; 
import { Fontisto, Ionicons, FontAwesome5 } from '@expo/vector-icons'; 

// Components
import GoBack from '../components/atoms/GoBack';
import { Button } from '@ui-kitten/components';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground, medicineLevelLow, medicineLevelMedium, medicineLevelHigh } from '../config/theme';

// Sizing
const TOP_HEADER_HEIGHT = height * 0.3;
import {CELL_HEIGHT} from '../components/molecules/AnimalList';
import { CELL_WIDTH } from '../components/molecules/MainCards';

const useMedicationIcon = (props) => (
    <FontAwesome5 {...props} name="hand-holding-medical" size={20} color="white" />
)

const styles = StyleSheet.create({
    name: {
        fontSize: 35,
        fontFamily: 'RobotoMono_700Bold',
        position: 'absolute',
        left: SPACING,
        color: 'white',
        top: TOP_HEADER_HEIGHT / 1.5,
    },
    medicatedIcon: {
        top: 0,
        left: SPACING * 5
    },
    button: {
        borderRadius: 10, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default function MedicineDetail ({ navigation, route }) {
    const { item } = route.params;

    const color = item.medicineLevel === 'Low Quantity' ? medicineLevelLow
                              : item.medicineLevel === 'Medium Quantity' ? medicineLevelMedium
                              : medicineLevelHigh

    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
            <GoBack />
            
            <Text style={styles.name}>
                {item.medicineName} 
                <Ionicons name='ellipse' size={25} color={color} />
            </Text>

            {/* First Section */}
            <View style={{flexDirection: 'row', top: TOP_HEADER_HEIGHT / 1.5}}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Entypo name="heart-outlined" size={35} color="white" style={styles.medicatedIcon} />
                        <Text style={{fontSize: 35, color: 'white', left: SPACING * 6, fontFamily: 'RobotoMono_700Bold'}}>7</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, color: 'white', left: SPACING * 2, fontFamily: 'RobotoMono_700Bold'}}>Animals Medicated</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'column', left: SPACING * 6}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Fontisto name="injection-syringe" size={35} color="white" style={styles.medicatedIcon} />
                        <Text style={{fontSize: 35, color: 'white', left: SPACING * 6, fontFamily: 'RobotoMono_700Bold'}}>2</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, color: 'white', left: SPACING * 2, fontFamily: 'RobotoMono_700Bold'}}>Mililitres Left</Text>
                    </View>
                </View>
                
            </View> 

            <View style={{padding: SPACING, top: TOP_HEADER_HEIGHT / 1.3}}>
                <Button style={styles.button} accessoryLeft={useMedicationIcon}>
                    <Text style={{color: 'white', fontSize: 17, fontFamily: 'RobotoMono_700Bold'}}>Use Medication</Text>
                </Button>
            </View>
            
            {/* Note Edit Section */}
            <View style={{flexDirection: 'column', top: TOP_HEADER_HEIGHT / 1.2}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{padding: SPACING}}>
                        <Text style={{color: 'white', fontSize: 17, fontFamily: 'RobotoMono_700Bold'}}>Note</Text>
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
            
            
            



        </SafeAreaView>
    )
}