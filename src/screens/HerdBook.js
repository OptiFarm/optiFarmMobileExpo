import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import GoBack from '../components/atoms/GoBack'
import { PageHeader } from '../components/atoms/PageHeader'
import AnimalList from '../components/molecules/AnimalList'

// Theme
import { SPACING, defaultBackground } from '../config/theme';

export default function HerdBook () {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <GoBack />
            <PageHeader  label="My Herd"/>
            <AnimalList /> 
        </SafeAreaView>
    )
}