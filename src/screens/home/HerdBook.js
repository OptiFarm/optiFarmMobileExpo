import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader';
import { AnimalItemView } from '../../components/atoms/AnimalItemView';

// DATA
import AnimalData from '../../config/data/Animal';

// THEME
import { SPACING, defaultBackground, cardBackground } from '../../config/theme';

export default function HerdBook ({navigation}) {
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground }}>
            <PageHeader label="My Herd" goBack={navigation.goBack} showChevron='true' showSearch='true' whereScreen='HerdBook'/>
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            <View style={{flexDirection: 'row', paddingBottom: SPACING}}>
                <Button onPress={() => navigation.navigate('Home', {screen: 'AnimalForm'})}
                        mode="contained" color='#E4E5E9' style={{marginHorizontal: SPACING, marginVertical: SPACING, borderRadius: 20,}} 
                        uppercase={false}
                        labelStyle={{fontFamily: 'Sora-SemiBold', fontSize: 15, color: cardBackground}}
                        icon={({ size, color }) => (
                            <MaterialCommunityIcons name="plus-circle" size={24} color={cardBackground} />
                        )} 
                >
                    Add Animal
                </Button>
            </View>
            <FlatList
                style={{marginBottom: 30}}
                showsVerticalScrollIndicator={false}
                data={AnimalData}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({item}) => <AnimalItemView item={item} navigation={navigation} />} 
            /> 
        </View>
        </>
    );
};