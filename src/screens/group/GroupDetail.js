import React, { useCallback, useMemo, useRef, useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getStatusBarHeight } from 'react-native-status-bar-height'

// COMPONENTS
import { 
    SafeAreaView, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    Platform, 
    FlatList, 
    Image,
    Alert,
} from 'react-native';
import { AnimalItemView } from '../../components/atoms/AnimalItemView';
import { Button } from 'react-native-paper';
import BottomSheet, {
    BottomSheetFlatList,
    BottomSheetModalProvider,
    BottomSheetModal,
    BottomSheetBackdrop,
    BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { CustomSheetBackground } from "../../components/atoms/CustomSheetBackground";
import AddToGroup  from '../../components/molecules/AddToGroup';

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

// THEME
import { SPACING, width, height, defaultBackground, cardBackground, } from '../../config/theme';

// QUERY
import { useQuery, useMutation } from "@apollo/client";
import { GET_HERD, GET_ANIMAL_IN_GROUP } from "../../config/graphql/queries";
import { DELETE_GROUP } from '../../config/graphql/mutation';

// SIZING
const styles = StyleSheet.create({
    name: {
        fontSize: 30,
        fontFamily: 'Sora-Bold',
        color: '#F3F4B8',
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
        justifyContent: "center",
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: "white",
        fontFamily: "Sora-SemiBold",
        height: 45,
    },
    containerModal: {
        paddingHorizontal: SPACING,
        paddingVertical: 5,
    },
});

const modalStyles = StyleSheet.create({
    contentContainer: {
      padding: SPACING,
    },
});

export default function GroupDetail ({ navigation, route }) {
    const { item } = route.params;

    const [animalID, setAnimalID] = useState('');
    const [sheetClose, setSheetClose] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const groups_id = item._id;

    // ASSIGN MEDICATION MODAL
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    const bottomSheetModalRef = useRef(null);

    const { data, loading } = useQuery(GET_HERD);
    const { data: getAnimalInGroup, loading: loadAnimalInGroup, refetch } = 
        useQuery(GET_ANIMAL_IN_GROUP, {
            variables: {groups_id}
        }
    );
    const [deleteGroup, { data: deleteAnimal }] = useMutation(DELETE_GROUP, {
        onCompleted(data) {
            if(data.deleteGroup.responseCheck.success) {
                navigation.navigate("GroupTab");
            } else {
                const message = data.deleteGroup.responseCheck.message;
                Alert.alert("Unable to Delete Group", message);
            }
        }
    });
    
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            //-1 sheet close
            //1 sheet open
            refetch();
        }
    }, []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    if (loading || loadAnimalInGroup) {
        return <PageLoader />;
    }

    const AnimalList = data.herd.animals;
    const AnimalInGroupList = getAnimalInGroup.animalsInGroup.animals;

    const renderAnimalList = ({ item }) => {
        const cowLogo =
          item.male_female === "F"
            ? "https://i.ibb.co/B4cgVmv/cow-5.png"
            : "https://i.ibb.co/g6MntkZ/cow-6.png";
    
        const _id = item._id;

        // Checking if item (object inside the modal) already exist in the group list
        const indexOfItem = AnimalInGroupList.findIndex(item => item._id === _id);
        
        const RenderButton = () => {
            if (indexOfItem === -1) {
                return (
                    <AddToGroup groups_id={groups_id} _id={_id} />
                )
            } else {
                return (
                    <Button
                        mode="contained" 
                        color='#E4E5E9' 
                        style={{position: "absolute", right: SPACING, borderRadius: 10,}} 
                        uppercase={false}
                        labelStyle={{fontFamily: 'Sora-SemiBold', fontSize: 15, color: cardBackground}}
                        compact={true}
                        disabled={true}
                    >
                        Add
                    </Button>
                )
            }
        }

        return (
            <>
            <View style={{ flexDirection: "row", marginBottom: 40, alignItems: "center", }}>
                <Image source={{ uri: cowLogo }} style={{ height: 50, width: 50 }} />
                <View>
                    <Text
                        style={{
                        fontFamily: "Sora-SemiBold",
                        fontSize: 
                        18,
                        color: "white",
                        left: SPACING,
                        }}
                    >
                        ID: <Text style={{ color: "#F4F3BE" }}>{item.tag_number}</Text>
                    </Text>
                    <Text
                        style={{
                        fontFamily: "Sora-SemiBold",
                        fontSize: 18,
                        color: "white",
                        left: SPACING,
                        }}
                    >
                        Breed Type:{" "}
                        <Text style={{ color: "#F4F3BE" }}>{item.breed_type}</Text>
                    </Text>
                </View>
                <RenderButton/>
            </View>
            </>
        );
    };

    const search = (searchText) => {
        setSearchText(searchText);
    
        let filteredData = AnimalList.filter(function (item) {
          const tag_number_search = item.tag_number.toString().includes(searchText);
          const breed_type_search = item.breed_type.includes(
            searchText.toUpperCase()
          );
    
          return tag_number_search || breed_type_search;
        });
    
        setFilteredData(filteredData);
    };

    // DELETE GROUP
    const handleDeleteGroup = () => {
        Alert.alert(
            "Delete Group",
            "Are you sure you want to delete this Group?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => deleteGroup({
                        variables: {
                            _id: groups_id,
                        }
                    }),
                },
            ]
        );
    }

    return (
        <>
        <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
            <View style={[styles.navBar, {marginTop: Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight() - 20}]}>
                <TouchableOpacity style={styles.leftContainer} onPress={navigation.goBack}>
                    <MaterialIcons name="arrow-back-ios" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.name}>
                    {item.group_name} 
                </Text>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={handleDeleteGroup}>
                        <MaterialIcons name="delete" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={{fontSize: 20, fontFamily: 'Sora-Bold', textAlign: 'center', color: 'white', paddingBottom: SPACING}}>
                {item.group_description}
            </Text>
            <View style={{flexDirection: 'row', paddingBottom: SPACING}}>
                <Button 
                    onPress={handlePresentModalPress}
                    mode="contained" color='#E4E5E9' 
                    style={{marginHorizontal: SPACING, marginTop: SPACING, borderRadius: 20,}} 
                    uppercase={false}
                    labelStyle={{fontFamily: 'Sora-SemiBold', fontSize: 15, color: cardBackground}}
                    icon={({ size, color }) => (
                        <MaterialCommunityIcons name="plus-circle" size={24} color={cardBackground} />
                    )} 
                >
                    Add Animal
                </Button>
            </View>
            <FlatList
                style={{marginBottom: 30}}
                showsVerticalScrollIndicator={false}
                data={AnimalInGroupList}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({item}) => <AnimalItemView item={item} navigation={navigation} />} 
            /> 
        </SafeAreaView>
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
                    placeholder="Search for Animal"
                    clearButtonMode="always"
                    onChangeText={search}
                    value={searchText}
                    placeholderTextColor="#848D95"
                    returnKeyType="search"
                />
            </View>
            <BottomSheetFlatList
                showsVerticalScrollIndicator={true}
                data={
                    filteredData && filteredData.length > 0
                    ? filteredData
                    : AnimalList
                }
                keyExtractor={(item, index) => item._id}
                renderItem={renderAnimalList}
                contentContainerStyle={modalStyles.contentContainer}
            />
            </BottomSheetModal>
        </BottomSheetModalProvider>
        </>
    )
}