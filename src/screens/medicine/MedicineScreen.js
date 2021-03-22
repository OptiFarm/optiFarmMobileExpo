import * as React from 'react';
import { useNavigation } from '@react-navigation/core';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { MedicineItemView } from '../../components/atoms/MedicineItemView';

// DATA
import MedicineData, { homepageMedicineData } from '../../config/data/Medicine';

// THEME
import { SPACING, defaultBackground, cardBackground, medicineLevelLow, medicineLevelMedium, medicineLevelHigh, CELL_HEIGHT } from '../../config/theme';

export default function MedicineScreen ({navigation}, props) {
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
                    data={MedicineData}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ padding: SPACING }}
                    renderItem={({item}) => <MedicineItemView item={item} navigation={navigation} />
                    }
                />
            </View>
        </>
    )
}