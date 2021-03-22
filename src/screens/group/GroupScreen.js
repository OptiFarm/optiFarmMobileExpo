import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

// COMPONENT
import { PageHeader } from '../../components/atoms/PageHeader'
import GroupList from '../../components/molecules/GroupList'

// THEME
import { SPACING, defaultBackground } from '../../config/theme';

export default function GroupScreen () {
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground,}}>
            <PageHeader  label="Groups"/> 
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            <GroupList /> 
        </View>
        </>
    )
}