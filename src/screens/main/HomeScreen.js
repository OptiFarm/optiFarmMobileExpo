import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';

// COMPONENTS
import { MainCards } from '../../components/molecules/MainCards'
import { PageHeader } from '../../components/atoms/PageHeader';
import AnimalList from '../../components/molecules/AnimalList'
import MedicineList from '../../components/molecules/MedicineList'
import { ScrollView, View } from 'react-native';

// THEME
import { defaultBackground } from '../../config/theme';

export default function HomeScreen ({navigation}) {
    const ref = React.useRef(null);
    useScrollToTop(ref);

    return (
        <>
            <SafeAreaView style={{backgroundColor: defaultBackground,}}>
                <PageHeader label='Home' />
            </SafeAreaView>
            <View style={{backgroundColor: defaultBackground, flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false} ref={ref}>
                    <MainCards navigation={navigation} />
                    <MedicineList homepage/>
                </ScrollView>
            </View>
        </>
    );
};