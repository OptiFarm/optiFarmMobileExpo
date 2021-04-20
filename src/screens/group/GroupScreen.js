import React, { useEffect } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// COMPONENTS
import { View, FlatList, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../components/atoms/PageHeader'
import { GroupItemView } from '../../components/atoms/GroupItemView';

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

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
    },
    name: {
        fontSize: 25,
        fontFamily: 'Sora-Bold',
        color: '#F3F4B8',
        paddingTop: SPACING,
        textAlign: 'center'
    },
    groupLabel: {
        fontSize: 18, 
        paddingTop: 35, 
        color: 'white', 
        opacity: 0.8, 
        fontFamily: 'Sora-SemiBold',
    },
    groupDesc: {
        color: 'white', 
        fontSize: 18, 
        fontFamily: 'Sora-Bold',
        top: 5,
        textAlign: 'center',
    },
})

export default function GroupScreen ({navigation}) {

    const ref = React.useRef(null);
    useScrollToTop(ref);

    const { data, loading, refetch } = useQuery(GET_GROUP);

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

    const GroupList = data.groups.groups;

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground,}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING, marginBottom: SPACING}}> 
                <View style={styles.header_inner}>
                    <PageHeader label="My Groups" goBack={navigation.goBack} showChevron='false' />
                </View>              
            </View>  
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            <View style={{backgroundColor: defaultBackground, flex: 1}}>
                <View style={{flexDirection: 'row', paddingBottom: SPACING}}>
                    <Button 
                        onPress={() => navigation.navigate('Group', {screen: 'GroupForm'})}
                        mode="contained" color='#E4E5E9' 
                        style={{marginHorizontal: SPACING, marginVertical: SPACING, borderRadius: 20,}} 
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
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item}) => <GroupItemView item={item} navigation={navigation} />}
                    ref={ref}
                    numColumns = {2}
                    key={1}
                />
            </View>
        </View>
        </>
    )
}