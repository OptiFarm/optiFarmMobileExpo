import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Avatar } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

// Theme
import { SPACING, defaultBackground } from '../config/theme';

export default function SettingsScreen () {
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>

        </SafeAreaView>
    )
}