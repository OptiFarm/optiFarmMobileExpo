import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

// COMPONENT
import { PageHeader } from '../../components/atoms/PageHeader'

// THEME
import { SPACING, defaultBackground } from '../../config/theme';

export default function ProfileScreen () {
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground,}}>
            <PageHeader  label="Profile"/> 
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
           {/* TO ADD COMPONENTS HERE */}
        </View>
        </>
    )
}