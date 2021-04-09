import * as React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useScrollToTop } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import faker from 'faker';

// COMPONENTS
import { View, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Text, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { MedicineItemView } from '../../components/atoms/MedicineItemView';

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_MEDICATIONS } from '../../config/graphql/queries';
 
// THEME
import { SPACING, defaultBackground, cardBackground, medicineLevelLow, medicineLevelMedium, medicineLevelHigh, CELL_HEIGHT } from '../../config/theme';

export default function MedicineScreen ({navigation}, props) {
    const ref = React.useRef(null);
    useScrollToTop(ref);

    // MEDICINE LIST

    const { data, loading } = useQuery(GET_MEDICATIONS);

    // List of medicines
    const testList = data.medications.medications;

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        testList;
        wait(2000).then(() => setRefreshing(false));
    }, []);

    // if (loading) {
    //     return <PageLoader />
    // }

    const medicineData = data.medications.medications.map((item, index) => ({
        ...item,
        key: faker.random.uuid()
    }))

    return (
        <>
            <SafeAreaView style={{backgroundColor: defaultBackground,}}>
                <PageHeader label="My Medicine" showSearch='true' whereScreen='MedicineList'/>
            </SafeAreaView>
            <View style={{backgroundColor: defaultBackground, flex: 1}}>
                <View style={{flexDirection: 'row', paddingBottom: SPACING}}>
                    <Button onPress={() => navigation.navigate('Medicine', {screen: 'MedicineForm'})}
                            mode="contained" color='#E4E5E9' style={{marginHorizontal: SPACING, marginTop: SPACING, borderRadius: 20,}} 
                            uppercase={false}
                            labelStyle={{fontFamily: 'Sora-SemiBold', fontSize: 15, color: cardBackground}}
                            icon={({ size, color }) => (
                                <MaterialCommunityIcons name="plus-circle" size={24} color={cardBackground} />
                            )} 
                    >
                        Add Medicine
                    </Button>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={medicineData}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ padding: SPACING }}
                    renderItem={({item}) => <MedicineItemView item={item} navigation={navigation} />}
                    ref={ref}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                          progressBackgroundColor='white'
                          tintColor='white'
                        />
                    }
                />
            </View>
        </>
    )
}