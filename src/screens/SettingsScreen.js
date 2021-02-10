import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 

// Components
import { Avatar } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

// Theme
import { SPACING, defaultBackground } from '../config/theme';

import { AuthContext } from '../components/context'

export default function SettingsScreen () {
    const { signOut } = React.useContext(AuthContext)
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
            <TouchableOpacity onPress={() => {signOut()}}>
                <Ionicons name="log-out-outline" size={35} color="white" />
            </ TouchableOpacity>
        </SafeAreaView>
    )
}