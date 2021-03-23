import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader';
import { Button } from 'react-native-paper';

// THEME
import { SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';
import { ScrollView } from 'react-native';

// SIZING
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
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

export default function AssignMedicationConfirm ({ navigation, route }) {

    // Object {
    //     "administered_by": "Conor",
    //     "animal": "40122",
    //     "medication": "Penstrep",
    //     "quantity_administered": "2",
    //     "reason_for_administration": "For test",
    //     "withdrawalMeat": "12 Days",
    //     "withdrawalMilk": "10 Days",
    //   }

    // Missing: withdrawal period (active/no active)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <PageHeader  label="Medication Details" goBack={navigation.goBack} showChevron='true'/>

                {/* CONFIRMATION CARD */}
                <ScrollView style={{ paddingHorizontal: SPACING }}>
                    <View style={{ flex: 1, padding: SPACING, height: height - 200, top: SPACING}}>
                        <View style={[StyleSheet.absoluteFillObject, {backgroundColor: cardBackground, borderRadius: 15}]}/>

                        <Text style={styles.name}>{route.params['medication']}</Text>
                        <Text style={styles.medicineType}>Medicament</Text>

                        <View style={styles.border}/>

                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style={styles.medicineLabel}>Animal ID</Text>
                                <Text style={[styles.medicineDesc, {color: '#F3F4B8'}]}>{route.params['animal']}</Text>
                            </View>
                            <View style={{position: 'absolute', right: 0}}>
                                <Text style={styles.medicineLabel}>Administered By</Text>
                                <Text style={[styles.medicineDesc, {position: 'absolute', right: 0, top: 60,}]}>{route.params['administered_by']}</Text>
                            </View>
                        </View>

                        <Text style={styles.medicineLabel}>Date of Administration</Text>
                        <Text style={styles.medicineDesc}>{route.params['date_of_administration']}</Text>

                        <Text style={styles.medicineLabel}>Withdrawal Period</Text>
                        <Text style={[styles.medicineDesc, {color: '#D74747'}]}>Active</Text>


                        <Text style={styles.medicineLabel}>Withdrawal Period (Meat)</Text>
                        <Text style={styles.medicineDesc}>{route.params['withdrawalMeat']}</Text>

                        <Text style={styles.medicineLabel}>Withdrawal Period (Milk)</Text>
                        <Text style={styles.medicineDesc}>{route.params['withdrawalMilk']}</Text>

                        <Text style={styles.medicineLabel}>Comment</Text>
                        <Text style={styles.medicineDesc}>{route.params['reason_for_administration']}</Text>
                    </View>

                    <Button
                        contentStyle={{height: 50, width: 25, }} 
                        mode="contained" 
                        color='#F4F3BE' 
                        style={{marginTop: 30, borderRadius: 10}} 
                        contentStyle={{height: 50}} 
                        labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                        onPress={() => navigation.navigate('HomeTab')}
                    >
                        Confirm
                    </Button>
                </ScrollView>
                
        </SafeAreaView>
    )
}