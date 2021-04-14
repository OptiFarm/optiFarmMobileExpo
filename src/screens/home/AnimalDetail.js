import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MaterialIcons, Feather } from '@expo/vector-icons'; 

// COMPONENTS
import { 
    SafeAreaView, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    TextInput,
    Image,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-paper';
import BottomSheet, { BottomSheetFlatList, BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { CustomSheetBackground } from '../../components/atoms/CustomSheetBackground'

// LOADER
import { PageLoader } from '../../components/atoms/PageLoader';

// QUERY
import { useQuery } from '@apollo/client';
import { GET_MEDICATIONS } from '../../config/graphql/queries';

// THEME
import { 
    SPACING, 
    height, 
    defaultBackground, 
    cardBackground, 
    topOS,
    CELL_HEIGHT,
    medicineLevelLow, 
    medicineLevelMedium, 
    medicineLevelHigh,
} from '../../config/theme';

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        fontFamily: 'Sora-Bold',
        color: 'white',
        textAlign: 'center'
    },
    key: {
        fontSize: 18, 
        paddingTop: 23, 
        color: 'white', 
        opacity: 0.8,
        fontFamily: 'Sora-SemiBold'
    },
    value: {
        fontSize: 18, 
        paddingTop: 23, 
        color: 'white', 
        fontFamily: 'Sora-SemiBold'
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: topOS,
        alignItems: 'center'
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        left: SPACING,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: SPACING
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'white',
        fontFamily: 'Sora-SemiBold',
        height: 45
    },
    containerModal: {
        paddingHorizontal: SPACING,
        paddingVertical: 5,
    }
});

const modalStyles = StyleSheet.create({
    contentContainer: {
      padding: SPACING,
    },
    itemContainer: {
      padding: 6,
      marginBottom: SPACING,
    },
});

export default function AnimalDetail ({ navigation, route }) {
    const { item, date_of_birth, cowLogo } = route.params;

    // Variables for Assign Medication Form
    const animalTag = item.tag_number;

    // ASSIGN MEDICATION MODAL
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    const bottomSheetModalRef = useRef(null);

    const handleSheetChanges = useCallback(index => {
        // console.log('handleSheetChange', index);
    }, []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const renderMedicineList = ({ item }) => {

        const medicineName = item.medication_name;
        const withdrawalMilk = item.withdrawal_days_dairy;
        const withdrawalMeat = item.withdrawal_days_meat;
        const medicineQuantity = item.remaining_quantity;
        const medicineQuantityType = item.quantity_type;

        // MEDICINE QUANTITY COLOR
        const midLevel = item.quantity / 2;

        const medicineLevelColor = item.remaining_quantity < midLevel ? medicineLevelLow
                                    : item.remaining_quantity === midLevel ? medicineLevelMedium
                                    : medicineLevelHigh

        return (
            <TouchableOpacity 
                onPress={() => navigation.navigate('Medicine', { screen: 'AssignMedicationForm', 
                params: {
                    animalID: animalTag, 
                    medicineName: medicineName, 
                    withdrawalMeat: withdrawalMeat, 
                    withdrawalMilk: withdrawalMilk, 
                    medicineQuantity: medicineQuantity, 
                    medicineQuantityType: medicineQuantityType, 
                    color: medicineLevelColor
                }})}
                style={{flexDirection: 'row', marginBottom: 40, alignItems: 'center',}}
            >
                <View style={{ flexDirection: 'row',}}>
                    <View style={{backgroundColor: cardBackground, borderTopRightRadius: 15, borderBottomRightRadius: 15, borderLeftColor: medicineLevelColor, borderLeftWidth: 3}}>
                        <Text style={{fontFamily: 'Sora-SemiBold', fontSize: 18, color: 'white', left: SPACING}}>Medicine: <Text style={{color: '#F4F3BE'}}>{item.medication_name}</Text></Text>
                        <View style={{borderBottomColor: '#9D9D9D', opacity: 0.4, borderBottomWidth: 1, top: 45, width: 350,}}/>
                        <Text style={{fontFamily: 'Sora-SemiBold', fontSize: 18, color: 'white', left: SPACING}}>Quantity: <Text style={{color: '#F4F3BE'}}>{item.remaining_quantity} / {item.quantity} {item.quantity_type}</Text></Text>
                    </View>
                </View>
                <Feather name="chevron-right" size={30} color="#F4F3BE" style={{position: 'absolute', right: 0, bottom: SPACING}}/> 
            </TouchableOpacity>
        );
    };

    // SEARCH HANDLES
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const { data, loading } = useQuery(GET_MEDICATIONS);
    
    if (loading) {
        return <PageLoader />
    } 

    const MedicineList = data.medications.medications;

    const search = (searchText) => {
        setSearchText(searchText);

        let filteredData = MedicineList.filter(function (item) {
            return item.medication_name.includes(searchText);
        });

        setFilteredData(filteredData);
    }

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground, flex: 1}}>

            {/* HEADER */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.tag_number} 
                </Text>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home', {screen: 'EditAnimalForm', params: {item, date_of_birth}})}>
                        <MaterialIcons name="edit" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{fontSize: 20, fontFamily: 'Sora-Bold', alignItems: 'center', color: 'white', paddingBottom: SPACING}}>
                <Image source={{ uri: cowLogo }} style={{ height: 40, width: 40 }}/>
            </View>

            {/* CONTENT */}
            <ScrollView style={{padding: SPACING, marginBottom: SPACING}}>
                <Button
                    contentStyle={{height: 50, width: 25, }} 
                    icon="pill" 
                    mode="contained" 
                    color='#F4F3BE' 
                    style={{marginTop: SPACING, borderRadius: 10}} 
                    contentStyle={{height: 50}} 
                    labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                    onPress={handlePresentModalPress}
                >
                    Give Medication
                </Button>
                {/* DETAILS */}
                <View style={{marginBottom: CELL_HEIGHT / 10, marginTop: 30, height: 325}} >
                    <View style={{flex: 1, padding: SPACING}}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={styles.key}>Herd No</Text>
                                    <Text style={styles.key}>Sire Number</Text>
                                    <Text style={styles.key}>Mother Number</Text>
                                    <Text style={styles.key}>Sex</Text>
                                    <Text style={styles.key}>Date of Birth</Text>
                                    <Text style={styles.key}>Breed</Text>
                                </View>
                                <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                    <Text style={styles.value}>{item.herd_number}</Text>
                                    <Text style={styles.value}>{item.sire_number}</Text>
                                    <Text style={styles.value}>{item.mother_number}</Text>
                                    <Text style={styles.value}>{item.male_female}</Text>
                                    <Text style={styles.value}>{date_of_birth}</Text>
                                    <Text style={styles.value}>{item.breed_type}</Text>
                                </View>
                            </View>
                    </View>
                </View>
                <View style={{marginBottom: CELL_HEIGHT / 10, height: 280}}>
                    <View style={{flex: 1, padding: SPACING}}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={styles.key}>Pure Breed</Text>
                                    <Text style={styles.key}>Vaccination</Text>
                                    <Text style={styles.key}>Doesing</Text>
                                    <Text style={styles.key}>Medication</Text>
                                    <Text style={styles.key}>View Progeny</Text>
                                </View>
                                <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                    <Text style={styles.value}>{item.pure_breed.toString()}</Text>
                                    <Text style={styles.value}>{item.animal_vaccine}</Text>
                                    <Text style={styles.value}>{item.animal_doesing}</Text>
                                    <Text style={styles.value}>{item.animal_medication}</Text>
                                    <TouchableOpacity>
                                        <Text style={[styles.value, {color: '#F4F3BE'}]}><Feather name='info' size={18} color='#F4F3BE'/> Click Here</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </View>
                </View>
                <Text style={{fontSize: 18, fontFamily: 'Sora-SemiBold', color: '#F4F3BE', paddingVertical: SPACING}}>Description</Text>
                <View style={{marginBottom: CELL_HEIGHT / 10, height: 150}}>
                    <View style={{flex: 1, padding: SPACING}}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={styles.key}>{item.description}</Text>
                                </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

        {/* ASSIGN MEDICATION MODAL */}
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                index={1}
                backgroundComponent={CustomSheetBackground}
                backdropComponent={BottomSheetBackdrop}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
            >
                <View style={styles.containerModal}>
                    <BottomSheetTextInput
                        style={styles.input}
                        placeholder="Search for Medicine"
                        clearButtonMode='always'
                        onChangeText={search}
                        value={searchText}
                        placeholderTextColor='#848D95'
                        returnKeyType='search'
                    />
                </View>
                <BottomSheetFlatList
                    showsVerticalScrollIndicator={true}
                    data={filteredData && filteredData.length > 0 ? filteredData : MedicineList}
                    keyExtractor={(item, index) => item.id}
                    renderItem={renderMedicineList}
                    contentContainerStyle={modalStyles.contentContainer}
                />
            </BottomSheetModal>
        </BottomSheetModalProvider>
        </>
    );
}