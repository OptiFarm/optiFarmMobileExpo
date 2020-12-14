import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

// Components
import { PageHeader } from '../components/atoms/PageHeader'
import GroupList from '../components/molecules/GroupList'

// Theme
import { SPACING, defaultBackground } from '../config/theme';

export default function GroupScreen () {
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
            <PageHeader  label="Groups"/> 
            <GroupList /> 
        </SafeAreaView>
    )
}