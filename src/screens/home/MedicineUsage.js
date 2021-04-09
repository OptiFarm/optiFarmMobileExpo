import * as React from 'react';
import faker from 'faker';

// COMPONENT
import { View, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { MedicineUsageItemView } from '../../components/atoms/MedicineUsageItemView';

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_MEDICATION_USAGE_LIST } from '../../config/graphql/queries';

// THEME
import { SPACING, defaultBackground } from '../../config/theme';

export default function MedicationUsage ({navigation}) {

    // MEDICINE USAGE LIST
    const { data, loading } = useQuery(GET_MEDICATION_USAGE_LIST);

    if (loading) {
        return <PageLoader />
    }

    const MedicineUsageData = data.administeredMedications.administeredMedications.map((item, index) => ({
        ...item,
        key: faker.random.uuid() 
    }))

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