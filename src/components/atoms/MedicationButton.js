import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

// Components
import { Button } from '@ui-kitten/components';

// Theme
import { fonts, SPACING, width, height } from '../../config/theme';
import { CELL_HEIGHT } from '../molecules/AnimalList';

// Sizing
const TOP_HEADER_HEIGHT = height * 0.3

const styles = StyleSheet.create({
    button: {
        borderRadius: 10, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const useMedicationIcon = (props) => (
    <FontAwesome5 {...props} name="hand-holding-medical" size={20} color="white" />
)

export default function MedicationButton() {

    return (
        <View style={{padding: SPACING, paddingTop: CELL_HEIGHT}}>
            <Button style={styles.button} accessoryLeft={useMedicationIcon}>
                <Text style={{color: 'white', fontSize: 17, fontFamily: 'RobotoMono_700Bold'}}>Use Medication</Text>
            </Button>
        </View>
    )
}