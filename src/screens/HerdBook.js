import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { PageHeader } from '../components/atoms/PageHeader'
import AnimalList from '../components/molecules/AnimalList'

// Theme
import { SPACING, defaultBackground } from '../config/theme';

export default function HerdBook ({navigation}) {
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground }}>
            <PageHeader label="My Herd" goBack={navigation.goBack} showChevron='true'/>
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            <AnimalList />
        </View>
        </>
    )
}