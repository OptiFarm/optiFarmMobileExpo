import * as React from 'react';

// COMPONENT
import { View, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { MedicineUsageItemView } from '../../components/atoms/MedicineUsageItemView';

// DATA
import { MedicineUsageData } from '../../config/data/Medicine';

// THEME
import { SPACING, defaultBackground } from '../../config/theme';

export default function MedicationUsage ({navigation}) {
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>
            <PageHeader label="Medicine Usage" goBack={navigation.goBack} showChevron='true' showSearch='true' whereScreen='MedicineUsage'/>
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1,}}>
            <FlatList
                style={{marginTop: SPACING}}
                showsVerticalScrollIndicator={false}
                data={MedicineUsageData}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({item}) => <MedicineUsageItemView item={item} navigation={navigation} />} 
            /> 
        </View>
        </>
    )
}