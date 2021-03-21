import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';

// COMPONENTS
import { Text, View, ScrollView } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader'
import MedicineList from '../../components/molecules/MedicineList'

// THEME
import { defaultBackground } from '../../config/theme';

export default function MedicineScreen () {
    const ref = React.useRef(null);
    useScrollToTop(ref);
    return (
        <>
            <SafeAreaView style={{backgroundColor: defaultBackground,}}>
                <PageHeader  label="My Medicine"/>
            </SafeAreaView>
            <View style={{backgroundColor: defaultBackground, flex: 1}}>
                <MedicineList/>
            </View>
        </>
    )
}