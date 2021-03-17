import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 

// COMPONENT
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { PageHeader } from '../../components/atoms/PageHeader'
import { Button } from 'react-native-paper';

// THEME
import { SPACING, defaultBackground, cardBackground } from '../../config/theme';

// DATA
import ProfileData from '../../config/data/Profile';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    name: {
      fontSize: 18,
      fontFamily: 'Sora-SemiBold',
      color: 'white',
      paddingLeft: SPACING
    },
    subName: {
        fontSize: 15,
        fontFamily: 'Sora-SemiBold',
        color: 'white',
        opacity: 0.8,
        paddingLeft: SPACING,
        paddingTop: SPACING
    },
    itemImage: {
        width: 25,
        height: 25,
    }
});

export default function ProfileScreen () {
    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground,}}>
            {/* <PageHeader  label="Profile"/>  */}
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1, flexDirection: 'column'}}>

            {/* HEADER */}
            <View style={{ position: 'absolute', padding: SPACING, flexDirection: 'row',}}>
                <View style={{width: 70, height: 70, backgroundColor: cardBackground, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={{ uri: 'https://i.ibb.co/LYbhhT1/index-png-1.png' }}
                        style={{width: 70, height: 70, borderRadius: 15}}
                    />
                </View>
                <View>
                    <Text style={styles.name}>Conor Clarke</Text>
                    <Text style={styles.subName}>Dairy Farmer</Text>
                </View>
            </View>

            <FlatList
                scrollEnabled={false}
                style={{padding: SPACING, top: 80}}
                data={ProfileData}
                keyExtractor={(item) => item.key}
                decelerationRate="fast"
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{flexDirection: 'row', paddingTop: 40, alignItems: 'center',}}>
                            <View style={{width: 50, height: 50, backgroundColor: `${item.backgroundColor}`, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                />
                            </View>
                            <Text style={{fontFamily: 'Sora-SemiBold', fontSize: 18, color: 'white', paddingLeft: SPACING}}>{item.type}</Text>
                            <Feather name="chevron-right" size={25} color="white" style={{position: 'absolute', right: 0, bottom: SPACING}}/>
                        </TouchableOpacity>
                    );
                }}
            />
            <View>
                <Button
                    contentStyle={{height: 50, width: 20,}} 
                    mode="contained" 
                    color='#F4F3BE' 
                    style={{bottom:20, borderRadius: 10, width: 350, alignSelf: 'center'}} 
                    contentStyle={{height: 50}} 
                    labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                >
                    Logout
                </Button>
            </View>

        </View>
        </>
    )
}
