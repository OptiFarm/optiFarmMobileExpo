import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';

// Components
import { HomeUserHeader } from '../../components/atoms/HomeUserHeader'
import { MainCards } from '../../components/molecules/MainCards'
import AnimalList from '../../components/molecules/AnimalList'
import MedicineList from '../../components/molecules/MedicineList'
import {StyleSheet, ScrollView, View} from 'react-native';

// Theme
import { SPACING, defaultBackground } from '../../config/theme';
import { PageHeader } from '../../components/atoms/PageHeader';

export default function HomeScreen ({navigation}) {
    const ref = React.useRef(null);
    useScrollToTop(ref);
    return (
        <>
            <SafeAreaView style={{backgroundColor: defaultBackground,}}>
                <PageHeader label='Home' />
            </SafeAreaView>
            <View style={{backgroundColor: defaultBackground, flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false} ref={ref}>
                    <MainCards navigation={navigation} />
                    <MedicineList homepage/>
                </ScrollView>
            </View>
        </>
    );
};