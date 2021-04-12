import * as React from 'react';

// COMPONENT
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { MedicineUsageItemView } from '../../components/atoms/MedicineUsageItemView';

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_MEDICATION_USAGE_LIST } from '../../config/graphql/queries';

// THEME
import { SPACING, defaultBackground, topOS } from '../../config/theme';

const styles = StyleSheet.create({
    header_inner: {
      flex:1,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      marginTop: topOS
    }
})

export default function MedicationUsage ({navigation}) {

    // MEDICINE USAGE LIST
    const { data, loading } = useQuery(GET_MEDICATION_USAGE_LIST);

    if (loading) {
        return <PageLoader />
    }

    const MedicineUsageList = data.administeredMedications.administeredMedications;

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING, marginBottom: SPACING}}> 
                <View style={styles.header_inner}>
                    <PageHeader label="Medicine Usage" goBack={navigation.goBack} showChevron='true' />
                </View>              
            </View>            
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1,}}>
            <FlatList
                style={{marginTop: SPACING}}
                showsVerticalScrollIndicator={false}
                data={MedicineUsageList}
                keyExtractor={(item, index) => item.id}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({item}) => <MedicineUsageItemView item={item} navigation={navigation} />} 
            /> 
        </View>
        </>
    )
}