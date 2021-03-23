import React from 'react';

// COMPONENTS
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// DATA
import MedicineData from '../../config/data/Medicine';

// THEME
import { SPACING, width, height, cardBackground, CELL_HEIGHT, medicineLevelLow, medicineLevelMedium, medicineLevelHigh } from '../../config/theme';

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontFamily: 'Sora-SemiBold',
        color: 'white',
        paddingTop: 5
    },
    medicineType: {
        fontSize: 18,
        top: 5,
        opacity: 0.8,
        color: 'white',
        fontFamily: 'Sora-SemiBold'
    },
    medicineLabel: {
        fontSize: 18, 
        paddingTop: 35, 
        opacity: 0.8, 
        color: 'white', 
        fontFamily: 'Sora-SemiBold'
    },
    medicineDesc: {
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold', 
        fontFamily: 'Sora-SemiBold',
        paddingTop: 10
    },
    border: {
        borderBottomColor: '#9D9D9D', 
        borderBottomWidth: 1, 
        top: 25, 
        marginBottom: 15,
        opacity: 0.3,
    }
});

export const MedicineItemView = ({ navigation, item }) => {

    const color = item.medicineLevel === 'Low Quantity' ? medicineLevelLow
                            : item.medicineLevel === 'Medium Quantity' ? medicineLevelMedium
                            : medicineLevelHigh
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Medicine', {screen: 'MedicineDetail', params: {item}})}
            style={{ marginBottom: CELL_HEIGHT / 10, top: CELL_HEIGHT / 10, height: 200 }}
        >
            <View style={{ flex: 1, padding: SPACING }}>
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderTopRightRadius: 15, borderBottomRightRadius: 15, borderLeftColor: color, borderLeftWidth: 3}]}/>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.name}>{item.medicineName}</Text>
                        <Text style={styles.medicineType}>{item.medicineType}</Text>    
                    </View>
                    <Text style={[styles.name, {color: color, fontSize: 18, top: 20, fontFamily: 'Sora-SemiBold', position: 'absolute', right: 0}]}>{item.medicineLevel}</Text>
                </View>
                <View style={styles.border} />
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.medicineLabel}>Expiration Date</Text>
                        <Text style={styles.medicineDesc}>{item.medicineExpiry}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 0}}>
                        <Text style={styles.medicineLabel}>Quantity</Text>
                        <Text style={[styles.medicineDesc, {position: 'absolute', right: 0, top: 58}]}>{item.medicineQuantity}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}