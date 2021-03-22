import * as React from 'react';

// COMPONENT
import { Text, View, SafeAreaView } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader'
import SearchList from '../../components/molecules/SearchList'

// THEME
import { SPACING, defaultBackground } from '../../config/theme';

export default function SearchScreen ({route}) {
    const whereScreen = route.params;
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground,}}>
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1,}}>
            <SearchList {...whereScreen}/>
        </View>
        </>
    )
}