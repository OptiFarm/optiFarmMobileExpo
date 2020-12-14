import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    Button,
    View,
    Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { HomeUserHeader } from '../components/atoms/HomeUserHeader'
import { MainCards } from '../components/molecules/MainCards'
import AnimalList from '../components/molecules/AnimalList'
import MedicineList from '../components/molecules/MedicineList'

// Theme
import { SPACING, defaultBackground } from '../config/theme';

export default function HomeScreen ( {navigation} ) {
    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
                <HomeUserHeader />
                <AnimalList homescreen />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MainCards navigation={navigation} />
                    <MedicineList homepage/>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};