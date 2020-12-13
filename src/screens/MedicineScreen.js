import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

// Components
import GoBack from '../components/atoms/GoBack'
import { PageHeader } from '../components/atoms/PageHeader'

// Theme
import { SPACING, defaultBackground } from '../config/theme';

export default function MedicineScreen () {
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
            <GoBack />
            <PageHeader  label="Medicine"/>
        </SafeAreaView>
    )
}