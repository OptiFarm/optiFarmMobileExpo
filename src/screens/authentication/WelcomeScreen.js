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


// Theme
import { SPACING, defaultBackground } from '../../config/theme';

export default function HomeScreen ( {navigation} ) {
    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground, paddingBottom: -50 }}>

            </SafeAreaView>
        </>
    );
};