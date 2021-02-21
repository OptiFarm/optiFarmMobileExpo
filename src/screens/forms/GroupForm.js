import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import {StyleSheet, View, Text, TextInput, Alert, FlatList, TouchableOpacity} from 'react-native';
import { BackButton } from '../../components/atoms/BackButton'
import { PageHeader } from '../../components/atoms/PageHeader'
import { Input, IndexPath, Select, Button } from '@ui-kitten/components';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground } from '../../config/theme';

// Data
import MedicineFormData from '../../config/form/MForm';

// Sizing
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
    input: {
        color: 'white',
        fontFamily: 'RobotoMono_700Bold',
        fontSize: 20,
        paddingTop: 20,
        backgroundColor: '#3F3B51',
        borderColor: defaultBackground,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'white', 
        borderColor: defaultBackground, 
        height: 50, 
        borderRadius: 10,
        top: 20
    },
});

export default function GroupForm ({ navigation }) {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
            <BackButton goBack={navigation.goBack} />  
            <PageHeader  label="Group Details"/>
        </SafeAreaView>
    )
}