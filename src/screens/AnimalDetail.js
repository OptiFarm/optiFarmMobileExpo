import React, { useCallback, useMemo, useRef } from 'react';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import { getStatusBarHeight } from 'react-native-status-bar-height'

// COMPONENTS
import { 
    SafeAreaView, 
    View, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Text, 
    TextInput,
    ScrollView,
    Button
} from 'react-native';
import { BackButton } from '../components/atoms/BackButton'
import { EditButton } from '../components/atoms/EditButton';
import { Card, Paragraph } from 'react-native-paper';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { CustomSheetBackground } from '../components/atoms/CustomSheetBackground'

// THEME
import { 
    SPACING, 
    height, 
    defaultBackground, 
    cardBackground, 
    medicineLevelLow, 
    medicineLevelMedium, 
    medicineLevelHigh 
} from '../config/theme';

// SIZING
import { CELL_HEIGHT } from '../components/molecules/AnimalList';

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        fontFamily: 'RobotoMono_700Bold',
        color: 'white',
    },
    key: {
        fontSize: 15, 
        paddingTop: 23, 
        color: 'grey', 
        fontFamily: 'RobotoMono_700Bold'
    },
    value: {
        fontSize: 15, 
        paddingTop: 23, 
        color: 'white', 
        fontFamily: 'RobotoMono_700Bold'
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
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
    contentContainer: {
        flex: 1,
        padding: SPACING,
    },
});

export default function AnimalDetail ({ navigation, route }) {
    const { item } = route.params;
    const array = []
    array.push(item)

    // EDIT MODAL
    const bottomSheetModalRef = useRef(null);

    const snapPoints = useMemo(() => ['40%', '60%'], []);

    const sheetRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const [value, onChangeText] = React.useState('This is a note');

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>

            {/* HEADER */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.animal_id} 
                </Text>
                <TouchableOpacity style={styles.rightContainer}>
                    <FontAwesome5 name="hand-holding-medical" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 15, fontFamily: 'RobotoMono_700Bold', textAlign: 'center', color: '#6A7E89', paddingBottom: SPACING}}>
                {item.animal_group}
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
                        {/* DETAILS */}
                        <View style={{marginBottom: CELL_HEIGHT / 10, marginTop: 30, height: 225}} >
                            <View style={{flex: 1, padding: SPACING}}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Tag No</Text>
                                            <Text style={styles.key}>Sex</Text>
                                            <Text style={styles.key}>Date of Birth</Text>
                                            <Text style={styles.key}>Breed</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.animal_tag}</Text>
                                            <Text style={styles.value}>{item.animal_sex}</Text>
                                            <Text style={styles.value}>{item.animal_dob}</Text>
                                            <Text style={styles.value}>{item.animal_breed}</Text>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        <View style={{marginBottom: CELL_HEIGHT / 10, height: 225}}>
                            <View style={{flex: 1, padding: SPACING}}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Vaccination</Text>
                                            <Text style={styles.key}>Doesing</Text>
                                            <Text style={styles.key}>Medication</Text>
                                            <Text style={styles.key}>View Proginy</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.animal_vaccine}</Text>
                                            <Text style={styles.value}>{item.animal_doesing}</Text>
                                            <Text style={styles.value}>{item.animal_medication}</Text>
                                            <Text style={styles.value}>Click Here</Text>
                                        </View>
                                </View>
                            </View>
                        </View>

                        {/* NOTE */}
                        <View style={{marginBottom: CELL_HEIGHT / 10, height: 225, marginTop: 10}} >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0}}>
                                <Text style={{fontSize: 15, fontFamily: 'RobotoMono_700Bold', textAlign: 'left', color: 'grey'}}>Note</Text>
                                <TouchableOpacity onPress={handlePresentModalPress}>
                                    <Text style={{fontSize: 15, fontFamily: 'RobotoMono_700Bold', color: '#91CCFE'}}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <Card style={{borderRadius: 10, marginTop: 10, backgroundColor: cardBackground}}>
                                <Card.Content>
                                    <Paragraph style={{paddingVertical: SPACING, color: 'white'}}>This is a note</Paragraph>
                                </Card.Content>
                            </Card>
                        </View>
                        </>
                    )
                }}
            />

            {/* EDIT MODAL  */}
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        backgroundComponent={CustomSheetBackground}
                        backdropComponent={BottomSheetBackdrop}
                    >
                        <View style={styles.contentContainer}>
                            <Text style={{fontSize: 20, fontFamily: 'RobotoMono_700Bold', textAlign: 'left', color: '#6A7E89'}}>Edit Note</Text>
                            <TextInput
                                style={{height: 50, fontSize: 15, fontFamily: 'RobotoMono_700Bold', color: 'white'}}
                                onChangeText={text => onChangeText(text)}
                                value={value}
                            />
                        </View>
                        {/* <Button title='Done' onPress={() => handleClosePress()}>
                            Done
                        </Button> */}
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </SafeAreaView>
        </>
    );
}