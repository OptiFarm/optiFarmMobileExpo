import * as React from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { GroupItemView } from '../../components/atoms/GroupItemView';

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// DATA
import { groupData } from '../../config/data/Animal';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_GROUP } from '../../config/graphql/queries';
 
// THEME
import { SPACING, defaultBackground, cardBackground, topOS } from '../../config/theme';

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

export default function GroupScreen ({navigation}) {

    const ref = React.useRef(null);
    useScrollToTop(ref);

    const { data, loading } = useQuery(GET_GROUP);

    if (loading) {
        return <PageLoader />
    }

    const GroupList = data.groups.groups;
    
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground,}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING, marginBottom: SPACING}}> 
                <View style={styles.header_inner}>
                    <PageHeader label="Groups" goBack={navigation.goBack} showChevron='false' />
                </View>              
            </View>   
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
                    data={GroupList}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ paddingHorizontal: SPACING }}
                    renderItem={({item}) => <GroupItemView item={item} navigation={navigation} />}
                    ref={ref}
                />
            </View>
        </View>
        </>
    )
}