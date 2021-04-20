import React, { useState, useRef, useEffect } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// COMPONENTS
import {
    View,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { MedicineItemView } from '../../components/atoms/MedicineItemView';
import SearchBarList from '../../components/molecules/SearchBar';

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_MEDICATIONS } from '../../config/graphql/queries';

// THEME
import {
    SPACING,
    defaultBackground,
    cardBackground,
    width,
    topOS,
} from "../../config/theme";

const styles = StyleSheet.create({
    header_inner: {
      flex:1,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      marginTop: topOS
    },
})

export default function MedicineScreen ({navigation}, props) {
    const ref = React.useRef(null);
    useScrollToTop(ref);

    const [filteredData, setFilteredData] = useState([]);

    const { data, loading, refetch } = useQuery(GET_MEDICATIONS);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          if (refetch) {
            refetch();
          }
        });
        return unsubscribe;
    }, [navigation]);

    if (loading) {
        return <PageLoader />
    }

    const MedicineList = data.medications.medications;

    return (
        <>
            <SafeAreaView style={{backgroundColor: defaultBackground,}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING, marginBottom: SPACING}}> 
                    <View style={styles.header_inner}>
                        <PageHeader label="My Medicine" goBack={navigation.goBack} showChevron='false' />
                        <SearchBarList items={MedicineList} setFilteredData={setFilteredData} fromScreen='medicine'/>
                    </View>              
                </View>        
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
                    data={filteredData && filteredData.length > 0 ? filteredData : MedicineList}
                    keyExtractor={(item, index) => item._id}
                    contentContainerStyle={{ padding: SPACING }}
                    renderItem={({item}) => <MedicineItemView item={item} navigation={navigation} />}
                    ref={ref}
                />
            </View>
        </>
    )
}