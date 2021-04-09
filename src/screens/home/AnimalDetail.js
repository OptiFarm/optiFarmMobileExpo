import React, { useState } from "react";
import { MaterialIcons, Feather } from '@expo/vector-icons'; 
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
    Image
} from 'react-native';
import { Card, Paragraph, Modal, Portal, Provider, Title, Button } from 'react-native-paper';

// THEME
import { 
    SPACING, 
    height, 
    defaultBackground, 
    cardBackground, 
    topOS,
    CELL_HEIGHT
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
});

export default function AnimalDetail ({ navigation, route }) {
    const { item } = route.params;
    const array = []
    array.push(item)

    // EDIT MODAL
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: cardBackground, borderRadius: 15, marginHorizontal: SPACING, height: 250, bottom: 100};

    // COW LOGO
    const cowLogo = item.male_female === 'M' ? 'https://i.ibb.co/NnqjqXC/maleCow.png' : 'https://i.ibb.co/V989V52/female-Cow.png';

    return (
        <>
        <SafeAreaView style={{backgroundColor: defaultBackground}}>

            {/* HEADER */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.tag_number} 
                </Text>
                <View style={styles.rightContainer}>
                    <Image source={{ uri: cowLogo }} style={{ height: 40, width: 40 }}/>
                </View>
            </View>
            <Text style={{fontSize: 20, fontFamily: 'Sora-Bold', textAlign: 'center', color: 'white', paddingBottom: SPACING}}>
                Group: {item.animal_group}
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
                                            <Text style={styles.value}>{item.date_of_birth}</Text>
                                            <Text style={styles.value}>{item.breed_type}</Text>
                                        </View>
                                    </View>
                            </View>
                        </View>
                        <View style={{marginBottom: CELL_HEIGHT / 10, height: 235}}>
                            <View style={{flex: 1, padding: SPACING}}>
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: cardBackground, borderRadius: 15}]}></View>
                                    <View style={{flexDirection: 'row'}}>
                                        <View>
                                            <Text style={styles.key}>Vaccination</Text>
                                            <Text style={styles.key}>Doesing</Text>
                                            <Text style={styles.key}>Medication</Text>
                                            <Text style={styles.key}>View Progeny</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 0}}>
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

                        {/* NOTE */}
                        <View style={{marginBottom: CELL_HEIGHT / 10, height: 225, marginTop: 10}} >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0}}>
                                <Text style={{fontSize: 18, fontFamily: 'Sora-SemiBold', textAlign: 'left', color: 'white', opacity: 0.8}}>Description</Text>
                                <TouchableOpacity onPress={showModal}>
                                    <Text style={{fontSize: 18, fontFamily: 'Sora-SemiBold', color: '#F4F3BE'}}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <Card style={{borderRadius: 10, marginTop: 10, backgroundColor: cardBackground}}>
                                <Card.Content>
                                    <Paragraph style={{paddingVertical: SPACING, color: 'white', fontFamily: 'Sora-SemiBold', fontSize: 18}}>{item.description}</Paragraph>
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
                        {item.description}
                    </TextInput>
                    <Button icon="check" mode="contained" color='#F4F3BE' style={{top: 70, marginHorizontal: SPACING,}} onPress={hideModal} labelStyle={{fontFamily: 'Sora-Bold', fontSize: 17}}>
                        Edit
                    </Button>
                </Modal>
            </Portal>
        </Provider>
        </>
    );
}