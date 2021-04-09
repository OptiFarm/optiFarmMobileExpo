import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';
import faker from 'faker';

// COMPONENTS
import { ScrollView, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { MainCards } from '../../components/molecules/MainCards'
import { PageHeader } from '../../components/atoms/PageHeader';
import { MedicineItemView } from '../../components/atoms/MedicineItemView';

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_MEDICATIONS } from '../../config/graphql/queries';
 
// THEME
import { defaultBackground, SPACING, CELL_HEIGHT } from '../../config/theme';

export default function HomeScreen ({navigation}) {
    const ref = React.useRef(null);
    useScrollToTop(ref);

    // MEDICINE LIST
    const { data, loading } = useQuery(GET_MEDICATIONS);

    if (loading) {
        return <PageLoader />
    }

    const homepageMedicineData = data.medications.medications.map((item, index) => ({
        ...item,
        key: faker.random.uuid()
    }))

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground,}}>
            <PageHeader label='Home' />
        </SafeAreaView>
        <View style={{backgroundColor: defaultBackground, flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} ref={ref}>
                <MainCards navigation={navigation} />
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 25, fontFamily: 'Sora-Bold', top: CELL_HEIGHT / 10, color: 'white', padding: SPACING}}>
                        My Medicine
                    </Text>
                    <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => navigation.navigate('MedicineTab')}>
                        <Text style={{ fontSize: 18, lineHeight: CELL_HEIGHT * 0.55, fontFamily: 'Sora-Bold', color: '#F4F3BE',}}>
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{padding: SPACING}}    
                    showsVerticalScrollIndicator={false}
                    data={homepageMedicineData}
                    keyExtractor={(item) => item.key}
                    renderItem={({item}) => <MedicineItemView item={item} navigation={navigation} />}
                    ref={ref}
                />
            </ScrollView>
        </View>
        </>
    );
};