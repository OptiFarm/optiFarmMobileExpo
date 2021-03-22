import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { GroupItemView } from '../../components/atoms/GroupItemView';

// DATA
import { groupData } from '../../config/data/Animal';

// THEME
import { SPACING, defaultBackground, cardBackground } from '../../config/theme';

export default function GroupScreen ({navigation}) {
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground,}}>
            <PageHeader label="Groups" showSearch='true' whereScreen='GroupList'/>
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            <View style={{backgroundColor: defaultBackground, flex: 1}}>
                <View style={{flexDirection: 'row', paddingBottom: SPACING}}>
                    <Button onPress={() => navigation.navigate('Medicine', {screen: 'MedicineForm'})}
                            mode="contained" color='#E4E5E9' style={{marginHorizontal: SPACING, marginVertical: SPACING, borderRadius: 20,}} 
                            uppercase={false}
                            labelStyle={{fontFamily: 'Sora-SemiBold', fontSize: 15, color: cardBackground}}
                            icon={({ size, color }) => (
                                <MaterialCommunityIcons name="plus-circle" size={24} color={cardBackground} />
                            )} 
                    >
                        Add Group
                    </Button>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={groupData}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ paddingHorizontal: SPACING }}
                    renderItem={({item}) => <GroupItemView item={item} navigation={navigation} />}
                />
            </View>
        </View>
        </>
    )
}