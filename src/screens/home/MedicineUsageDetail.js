import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader';
import { Button } from 'react-native-paper';

// THEME
import { SPACING, width, height, defaultBackground, cardBackground, topOS } from '../../config/theme';
import { ScrollView } from 'react-native';

// SIZING
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
    header_inner: {
        flex:1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginTop: topOS
    },
    name: {
        fontSize: 25,
        fontFamily: 'Sora-Bold',
        color: '#F3F4B8',
        paddingTop: SPACING,
    },
    medicineType: {
        fontSize: 18,
        top: 5,
        opacity: 0.8,
        color: 'white',
        fontFamily: 'Sora-SemiBold',
    },
    medicineLabel: {
        fontSize: 18, 
        paddingTop: 35, 
        color: 'white', 
        opacity: 0.8, 
        fontFamily: 'Sora-SemiBold',
    },
    medicineDesc: {
        color: 'white', 
        fontSize: 18, 
        fontFamily: 'Sora-Bold',
        top: 5,
    },
    border: {
        borderBottomColor: '#9D9D9D', 
        borderBottomWidth: 1, 
        top: 20,
    },
});

export default function MedicineUsageDetail ({ navigation, route }) {

    // Object {
    //     "__typename": "AdministeredMedication",
    //     "administered_by": "Conor",
    //     "animal_id": "5fc543e9e04ba94a7cdf94a5",
    //     "date_of_administration": "2020-12-12T00:00:00.000Z",
    //     "id": "6046436af1d177186403ef61",
    //     "medication_id": "5fd89a8e915d5d3cb0015929",
    //     "quantity_administered": 10,
    //     "quantity_type": "MG",
    //     "reason_for_administration": "as",
    // }

    // Missing: withdrawal period (active/no active)
    // Missing: Dose given

    const {administeredBy, dateAdministered, quantityAdministered, quantityType, reason} = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING, marginBottom: SPACING}}> 
                <View style={styles.header_inner}>
                    <PageHeader label="Medication Details" goBack={navigation.goBack} showChevron='true' />
                </View>              
            </View>   

                {/* CONFIRMATION CARD */}
                <ScrollView style={{ paddingHorizontal: SPACING }}>
                    <View style={{ flex: 1, padding: SPACING, height: 500, top: SPACING}}>
                        <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderRadius: 15}]}/>

                        <Text style={styles.name}>MISSING</Text>
                        <Text style={styles.medicineType}>Medicament</Text>

                        <View style={styles.border}/>

                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style={styles.medicineLabel}>Animal ID</Text>
                                <Text style={[styles.medicineDesc, {color: '#F3F4B8'}]}>MISSING</Text>
                            </View>
                            <View style={{position: 'absolute', right: 0}}>
                                <Text style={styles.medicineLabel}>Administered By</Text>
                                <Text style={[styles.medicineDesc, {position: 'absolute', right: 0, top: 60,}]}>{administeredBy}</Text>
                            </View>
                        </View>

                        <Text style={styles.medicineLabel}>Date of Administration</Text>
                        <Text style={styles.medicineDesc}>{dateAdministered}</Text>

                        <Text style={styles.medicineLabel}>Quantity Administered</Text>
                        <Text style={styles.medicineDesc}>{quantityAdministered} {quantityType}</Text>

                        <Text style={styles.medicineLabel}>Reason</Text>
                        <Text style={styles.medicineDesc}>{reason}</Text>
                    </View>
                </ScrollView>
                
        </SafeAreaView>
    )
}