import React, { useCallback, useMemo, useRef } from 'react';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
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
} from 'react-native';
import { EditButton } from '../../components/atoms/EditButton';
import { Card, Paragraph, Modal, Portal, Provider, Title, Button } from 'react-native-paper';

// THEME
import { 
    SPACING, 
    height, 
    defaultBackground, 
    cardBackground, 
    medicineLevelLow, 
    medicineLevelMedium, 
    medicineLevelHigh 
} from '../../config/theme';

// SIZING
import { CELL_HEIGHT } from '../../components/molecules/AnimalList';

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
});

export default function MedicineDetail ({ navigation, route }) {
    const { item } = route.params;
    const array = []
    array.push(item)

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

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>

            {/* HEADER */}
            <View style={[styles.navBar, {marginTop: Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight() - 20}]}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.medicineName} 
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
                        <Button icon="pill" mode="contained" color={cardBackground} style={{marginTop: 30, borderRadius: 15}} contentStyle={{height: 50}} labelStyle={{fontFamily: 'Sora-SemiBold', fontSize: 15}}>
                            Give Medication
                        </Button>
                        {/* DETAILS */}
                        <View style={{marginBottom: CELL_HEIGHT / 10, marginTop: 30, height: 235}} >
                            <View style={{flex: 1, padding: SPACING}}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Purchase Date</Text>
                                            <Text style={styles.key}>Supplied By</Text>
                                            <Text style={styles.key}>Quantity</Text>
                                            <Text style={styles.key}>Expiry Date</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.medicinePurchaseDate}</Text>
                                            <Text style={styles.value}>{item.medicinePurchaseAt}</Text>
                                            <Text style={styles.value}>{item.medicineQuantity}</Text>
                                            <Text style={styles.value}>{item.medicineExpiry}</Text>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        <View style={{marginBottom: CELL_HEIGHT / 10, height: 225}}>
                            <View style={{flex: 1, padding: SPACING}}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Batch No</Text>
                                            <Text style={styles.key}>Withdrawal Period</Text>
                                            <Text style={styles.key}>Meat</Text>
                                            <Text style={styles.key}>Milk</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.medicineBatchNo}</Text>
                                            <Text style={{color: activeColor, fontSize: 18, paddingTop: 23, fontFamily: 'Sora-SemiBold'}}>{item.medicineWithdrawal}</Text>
                                            <Text style={styles.value}>{item.medicineMeat}</Text>
                                            <Text style={styles.value}>{item.medicineMilk}</Text>
                                        </View>
                                </View>
                            </View>
                        </View>

                        {/* NOTE */}
                        <View style={{marginBottom: CELL_HEIGHT / 10, height: 225, marginTop: 10}} >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0}}>
                                <Text style={{fontSize: 18, fontFamily: 'Sora-SemiBold', textAlign: 'left', color: 'white', opacity: 0.8}}>Comments</Text>
                                <TouchableOpacity onPress={showModal}>
                                    <Text style={{fontSize: 18, fontFamily: 'Sora-SemiBold', color: '#91CCFE'}}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <Card style={{borderRadius: 10, marginTop: 10, backgroundColor: cardBackground}}>
                                <Card.Content>
                                    <Paragraph style={{paddingVertical: SPACING, color: 'white', fontFamily: 'Sora-SemiBold', fontSize: 18}}>This is a note</Paragraph>
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
                        This is a note
                    </TextInput>
                    <Button icon="check" mode="contained" color='#91CCFE' style={{top: 70, marginHorizontal: SPACING,}} onPress={hideModal} labelStyle={{fontFamily: 'Sora-SemiBold', fontSize: 15}}>
                        Edit
                    </Button>
                </Modal>
            </Portal>
        </Provider>
        </>
    );
}