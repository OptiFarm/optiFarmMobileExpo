import React from 'react';
import Moment from 'moment';

// COMPONENTS
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// THEME
import { 
    SPACING, 
    width, 
    height, 
    cardBackground, 
    CELL_HEIGHT, 
    medicineEmpty,
    medicineLevelLow, 
    medicineLevelMedium, 
    medicineLevelHigh 
} from '../../config/theme';

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

    const midLevel = item.quantity / 2;

    const medicineLevelColor =
        item.remaining_quantity === 0
            ? medicineEmpty
            : item.remaining_quantity < midLevel && item.remaining_quantity > 0
            ? medicineLevelLow
            : item.remaining_quantity === midLevel
            ? medicineLevelMedium
            : medicineLevelHigh;

    const medicineLevelLabel =
        item.remaining_quantity === 0
            ? "None Remaining"
            : item.remaining_quantity < midLevel && item.remaining_quantity > 0
            ? "Low Quantity"
            : item.remaining_quantity === midLevel
            ? "Medium Quantity"
            : "High Quantity";

    const medicineType = item.medicine_type.charAt(0) + item.medicine_type.slice(1).toLowerCase();
    const medicineQuantityType = item.quantity_type === 'UNASSIGNED' ? '' : item.quantity_type;

    // FORMAT DATE TIME
    Moment.locale('en');
    var dt = item.purchase_date;
    const purchase_date = Moment(dt).format('YYYY-MM-DD');     

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Medicine', {screen: 'MedicineDetail', params: {item, purchase_date, medicineLevelLabel, medicineLevelColor, medicineQuantityType, medicineType}})}
            style={{ marginBottom: CELL_HEIGHT / 10, top: CELL_HEIGHT / 10, height: 200 }}
        >
            <View style={{ flex: 1, padding: SPACING }}>
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderTopRightRadius: 15, borderBottomRightRadius: 15, borderLeftColor: medicineLevelColor, borderLeftWidth: 3}]}/>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.name}>{item.medication_name}</Text>
                        <Text style={styles.medicineType}>{medicineType}</Text>    
                    </View>
                    <Text style={[styles.name, {color: medicineLevelColor, fontSize: 18, top: 20, fontFamily: 'Sora-SemiBold', position: 'absolute', right: 0}]}>{medicineLevelLabel}</Text>
                </View>
                <View style={styles.border} />
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.medicineLabel}>Expiration Date</Text>
                        <Text style={styles.medicineDesc}>{purchase_date}</Text>
                    </View>
                    <View style={{position: 'absolute', right: 0}}>
                        <Text style={[styles.medicineLabel, {alignSelf: 'flex-end',}]}>Quantity Left</Text>
                        <Text style={[styles.medicineDesc, {alignSelf: 'flex-end',}]}>{item.remaining_quantity} {medicineQuantityType}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}