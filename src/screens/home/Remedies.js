import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENT
import { PageHeader } from '../../components/atoms/PageHeader'

// THEME
import { SPACING, defaultBackground } from '../../config/theme';

export default function Remedies ({navigation}) {
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>
            <PageHeader label="Medicine Usage" goBack={navigation.goBack} showChevron='true'/>
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            {/* TO ADD COMPONENT HERE */}
        </View>
        </>
    )
}