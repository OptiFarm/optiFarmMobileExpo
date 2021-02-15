import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons'; 
import { Fontisto, Ionicons, FontAwesome5 } from '@expo/vector-icons'; 

// Components
import GoBack from '../components/atoms/GoBack';
import { Button } from '@ui-kitten/components';
import MedicationButton from '../components/atoms/MedicationButton';

// Theme
import { fonts, SPACING, width, height, defaultBackground, cardBackground, medicineLevelLow, medicineLevelMedium, medicineLevelHigh } from '../config/theme';

// Sizing
const TOP_HEADER_HEIGHT = height * 0.3;
import {CELL_HEIGHT} from '../components/molecules/AnimalList';
import { CELL_WIDTH } from '../components/molecules/MainCards';

const useMedicationIcon = (props) => (
    <FontAwesome5 {...props} name="hand-holding-medical" size={20} color="white" />
)

const styles = StyleSheet.create({
    name: {
        fontSize: 35,
        fontFamily: 'RobotoMono_700Bold',
        position: 'absolute',
        left: SPACING,
        color: 'white',
        top: TOP_HEADER_HEIGHT / 1.5,
    },
    medicatedIcon: {
        top: 0,
        left: SPACING * 5
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
    }
});

export default function MedicineDetail ({ navigation, route }) {
    const { item } = route.params;
    const array = []
    array.push(item)

    const color = item.medicineLevel === 'Low Quantity' ? medicineLevelLow
                              : item.medicineLevel === 'Medium Quantity' ? medicineLevelMedium
                              : medicineLevelHigh
    
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: SPACING, backgroundColor: defaultBackground }}>
            <GoBack />
            <Text style={styles.name}>
                {item.medicineName} 
                <Ionicons name='ellipse' size={25} color={color} />
            </Text>

            {/* First Section */}
            <View style={{flexDirection: 'row', top: TOP_HEADER_HEIGHT / 1.5, paddingBottom: CELL_HEIGHT / 2.5}}>
                <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Entypo name="heart-outlined" size={35} color="white" style={styles.medicatedIcon} />
                        <Text style={{fontSize: 35, color: 'white', left: SPACING * 6, fontFamily: 'RobotoMono_700Bold'}}>7</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, color: 'white', left: SPACING * 2, fontFamily: 'RobotoMono_700Bold'}}>Animals Medicated</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'column', left: SPACING * 6}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Fontisto name="injection-syringe" size={35} color="white" style={styles.medicatedIcon} />
                        <Text style={{fontSize: 35, color: 'white', left: SPACING * 6, fontFamily: 'RobotoMono_700Bold'}}>2</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, color: 'white', left: SPACING * 2, fontFamily: 'RobotoMono_700Bold'}}>Mililitres Left</Text>
                    </View>
                </View>
            </View> 
            <MedicationButton />
            <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                data={array}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ padding: SPACING }}
                renderItem={({ item }) => {   
                    return (
                        <>
                        <View style={{paddingBottom: SPACING * 5}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{padding: SPACING}}>
                                    <Text style={{color: 'grey', fontSize: 17, fontFamily: 'RobotoMono_700Bold'}}>Note</Text>
                                </View>
                                <Button status='info' style={{borderRadius: 20, width: 100, position: 'absolute', right: 0, right: SPACING}}>
                                    Edit
                                </Button>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{padding: SPACING}}>
                                    <Text style={{color: 'white', fontSize: 17, fontFamily: 'RobotoMono_700Bold'}}>Lorem Ipsum</Text>
                                </View>
                            </View>
                        </View>
                        <View 
                            style={{ marginBottom: CELL_HEIGHT / 10, top: 0, height: CELL_HEIGHT * 1.4}}
                            >
                            <View style={{ flex: 1, padding: SPACING }}>
                                <View style={[StyleSheet.absoluteFillObject,
                                    { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Date Purchased</Text>
                                            <Text style={styles.key}>Purchased At</Text>
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
                        <View 
                            style={{ marginBottom: CELL_HEIGHT / 10, top: 0, height: CELL_HEIGHT * 1.4}}
                            >
                            <View style={{ flex: 1, padding: SPACING }}>
                                <View style={[StyleSheet.absoluteFillObject,
                                    { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Batch No</Text>
                                            <Text style={styles.key}>Withdrawal Period</Text>
                                            <Text style={styles.key}>Meat</Text>
                                            <Text style={styles.key}>Milk</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
                                            <Text style={styles.value}>{item.medicineBatchNo}</Text>
                                            <Text style={styles.value}>{item.medicineWithdrawal}</Text>
                                            <Text style={styles.value}>{item.medicineMeat}</Text>
                                            <Text style={styles.value}>{item.medicineMilk}</Text>
                                        </View>
                                </View>
                            </View>
                        </View>
                        </>
                    )
                }}
            /> 
        </SafeAreaView>
    )
}