import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { MaterialIcons, Feather } from '@expo/vector-icons'; 
import { getStatusBarHeight } from 'react-native-status-bar-height';

// COMPONENTS
import { 
    SafeAreaView, 
    View, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Text, 
    TextInput,
    Image,
} from 'react-native';
import { Card, Paragraph, Modal, Portal, Provider, Button } from 'react-native-paper';
import BottomSheet, { BottomSheetFlatList, BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { CustomSheetBackground } from '../../components/atoms/CustomSheetBackground'

// THEME
import { 
    SPACING, 
    height, 
    defaultBackground, 
    cardBackground, 
    medicineLevelLow, 
    medicineLevelMedium, 
    medicineLevelHigh,
    CELL_HEIGHT
} from '../../config/theme';

// DATA
import { assignMedicationData } from '../../config/data/Animal'

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        fontFamily: 'Sora-Bold',
        color: 'white',
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
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        left: SPACING
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

export default function MedicineDetail ({ navigation, route }) {
    const { item } = route.params;
    const array = [];
    array.push(item);

    // Variables for Assign Medication Form
    const medicineName = item.medicineName;
    const withdrawalMilk = item.medicineMilk;
    const withdrawalMeat = item.medicineMeat;
    const medicineQuantity = item.medicineQuantity;

    // MEDICINE QUANTITY COLOR
    const color = item.medicineLevel === 'Low Quantity' ? medicineLevelLow
                              : item.medicineLevel === 'Medium Quantity' ? medicineLevelMedium
                              : medicineLevelHigh
    
    const activeColor = item.medicineWithdrawal === 'Active' ? medicineLevelLow : medicineLevelHigh

    // EDIT MODAL
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: cardBackground, borderRadius: 15, marginHorizontal: SPACING, height: 250, bottom: 100};

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

    const renderItem = ({ item }) => {

        // COW LOGO
        const cowLogo = item.animal_sex === 'Female' ? 'https://i.ibb.co/B4cgVmv/cow-5.png' : 'https://i.ibb.co/g6MntkZ/cow-6.png';

        return (
            <TouchableOpacity 
                onPress={() => navigation.navigate('AssignMedication', {animalID: item.animal_id, medicineName: medicineName, withdrawalMeat: withdrawalMeat, withdrawalMilk: withdrawalMilk, medicineQuantity: medicineQuantity, color: color})}
                style={{flexDirection: 'row', marginBottom: 40, alignItems: 'center',}}
            >
                <View style={{ flexDirection: 'row',}}>
                    <Image source={{ uri: cowLogo }} style={{ height: 50, width: 50 }}/>
                    <View>
                        <Text style={{fontFamily: 'Sora-SemiBold', fontSize: 18, color: 'white', left: SPACING}}>ID: <Text style={{color: '#F4F3BE'}}>{item.animal_id}</Text></Text>
                        <View style={{borderBottomColor: '#9D9D9D', opacity: 0.4, borderBottomWidth: 1, top: 45, width: 300,}}/>
                        <Text style={{fontFamily: 'Sora-SemiBold', fontSize: 18, color: 'white', left: SPACING}}><Text style={{color: 'white', opacity: 0.8}}>{item.animal_group}</Text></Text>
                    </View>
                </View>
                <Feather name="chevron-right" size={30} color="#F4F3BE" style={{position: 'absolute', right: 0, bottom: SPACING}}/> 
            </TouchableOpacity>
        );
    };

    // SEARCH HANDLES
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        setFilteredDataSource(assignMedicationData);
        setMasterDataSource(assignMedicationData);
    }, [])

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.animal_id ? item.animal_id.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>

            {/* HEADER */}
            <View style={[styles.navBar, {marginTop: Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight() - 20}]}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.medication_name} 
                </Text>
                <View style={styles.rightContainer}>
                </View>
            </View>
            <Text style={{fontSize: 20, fontFamily: 'Sora-Bold', textAlign: 'center', color: color, paddingBottom: SPACING,}}>
                {item.medicineLevel}
            </Text>

            {/* CONTENT */}
            <FlatList
                style={{backgroundColor: defaultBackground}}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                data={array}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={({ item }) => {
                    return (
                        <>
                        <Button
                            contentStyle={{height: 50, width: 25, }} 
                            icon="pill" 
                            mode="contained" 
                            color='#F4F3BE' 
                            style={{marginTop: 30, borderRadius: 10}} 
                            contentStyle={{height: 50}} 
                            labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17, color: cardBackground}}
                            onPress={handlePresentModalPress}
                        >
                            Give Medication
                        </Button>
                        {/* DETAILS */}
                        <View style={{marginBottom: CELL_HEIGHT / 10, marginTop: 30, height: 235}} >
                            <View style={{flex: 1, padding: SPACING}}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Expiry Date</Text>
                                            <Text style={styles.key}>Withdrawal Period</Text>
                                            <Text style={styles.key}>Meat</Text>
                                            <Text style={styles.key}>Milk</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.expiry_date}</Text>
                                            <Text style={{color: activeColor, fontSize: 18, paddingTop: 23, fontFamily: 'Sora-SemiBold'}}>{item.medicineWithdrawal}</Text>
                                            <Text style={styles.value}>{item.withdrawal_days_meat} days</Text>
                                            <Text style={styles.value}>{item.withdrawal_days_dairy} days</Text>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        <View style={{marginBottom: CELL_HEIGHT / 10, height: 225}}>
                            <View style={{flex: 1, padding: SPACING}}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Quantity</Text>
                                            <Text style={styles.key}>Purchase Date</Text>
                                            <Text style={styles.key}>Supplied By</Text>
                                            <Text style={styles.key}>Batch No</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.remaining_quantity} / {item.quantity} {item.quantity_type}</Text>
                                            <Text style={styles.value}>{item.purchase_date}</Text>
                                            <Text style={styles.value}>{item.supplied_by}</Text>
                                            <Text style={styles.value}>{item.batch_number}</Text>
                                        </View>
                                </View>
                            </View>
                        </View>

                        {/* NOTE */}
                        <View style={{marginBottom: CELL_HEIGHT / 10, height: 225, marginTop: 10}} >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0}}>
                                <Text style={{fontSize: 18, fontFamily: 'Sora-SemiBold', textAlign: 'left', color: 'white', opacity: 0.8}}>Comments</Text>
                                <TouchableOpacity onPress={showModal}>
                                    <Text style={{fontSize: 18, fontFamily: 'Sora-SemiBold', color: '#F4F3BE'}}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <Card style={{borderRadius: 10, marginTop: 10, backgroundColor: cardBackground}}>
                                <Card.Content>
                                    <Paragraph style={{paddingVertical: SPACING, color: 'white', fontFamily: 'Sora-SemiBold', fontSize: 18}}>{item.comments}</Paragraph>
                                </Card.Content>
                            </Card>
                        </View>
                        </>
                    )
                }}
            />
        </SafeAreaView>

        {/* EDIT MODAL */}
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <TextInput style={{fontSize: 18, fontFamily: 'Sora-SemiBold', color: 'white', bottom: 50, textAlign: 'center'}} autoFocus={true}>
                        {item.comments}
                    </TextInput>
                    <Button icon="check" mode="contained" color='#F4F3BE' style={{top: 70, marginHorizontal: SPACING,}} onPress={hideModal} labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17}}>
                        Edit
                    </Button>
                </Modal>
            </Portal>
        </Provider>
        
        {/* ASSIGN MEDICATION MODAL */}
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                index={1}
                backgroundComponent={CustomSheetBackground}
                backdropComponent={BottomSheetBackdrop}
            >
                {/* <Text style={{ padding: SPACING, color: 'white', fontSize: 25, fontFamily: 'Sora-Bold', marginBottom: SPACING}}>Select Animal</Text> */}
                <View style={styles.containerModal}>
                    <TextInput
                        style={styles.input}
                        textContentType="name"
                        placeholder="Search for Animal"
                        clearButtonMode='always'
                        onChangeText={(text) => searchFilterFunction(text)}
                        onClear={(text) => searchFilterFunction('')}
                        placeholderTextColor='#848D95'
                        keyboardType='decimal-pad'
                        returnKeyType='done'
                    />
                </View>
                <BottomSheetFlatList
                    showsVerticalScrollIndicator={true}
                    data={filteredDataSource}
                    keyExtractor={(item) => item.key}
                    renderItem={renderItem}
                    contentContainerStyle={modalStyles.contentContainer}
                />
            </BottomSheetModal>
        </BottomSheetModalProvider>
        </>
    );
}