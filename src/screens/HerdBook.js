import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { PageHeader } from '../components/atoms/PageHeader'
import AnimalList from '../components/molecules/AnimalList'
import { BackButton } from '../components/atoms/BackButton'

// Theme
import { SPACING, defaultBackground } from '../config/theme';

export default function HerdBook ({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <BackButton goBack={navigation.goBack} color='white'/>
            <PageHeader  label="My Herd"/>
            <AnimalList /> 
        </SafeAreaView>
    )
}