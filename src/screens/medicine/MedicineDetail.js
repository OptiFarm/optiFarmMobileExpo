import React, { useCallback, useMemo, useRef, useState } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Moment from "moment";

// COMPONENTS
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { CustomSheetBackground } from "../../components/atoms/CustomSheetBackground";

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

// THEME
import {
  SPACING,
  height,
  defaultBackground,
  cardBackground,
  medicineEmpty,
  medicineLevelLow,
  medicineLevelMedium,
  medicineLevelHigh,
  CELL_HEIGHT,
} from "../../config/theme";

// QUERY
import { useQuery } from "@apollo/client";
import { GET_HERD, GET_ACTIVE_MEDICATIONS_MEDICINE } from "../../config/graphql/queries";

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontFamily: "Sora-Bold",
    color: "white",
  },
  key: {
    fontSize: 18,
    paddingTop: 23,
    color: "white",
    opacity: 0.8,
    fontFamily: "Sora-SemiBold",
  },
  value: {
    fontSize: 18,
    paddingTop: 23,
    color: "white",
    fontFamily: "Sora-SemiBold",
  },
  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    left: SPACING,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    right: SPACING,
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
  itemContainer: {
    padding: 6,
    marginBottom: SPACING,
  },
});

export default function MedicineDetail({ navigation, route }) {

  Moment.locale('en');

  const {
    item,
    purchase_date,
    medicineLevelColor,
    medicineLevelLabel,
    medicineQuantityType,
    medicineType,
  } = route.params;

  // Variables for Assign Medication Form
  const medication_id = item._id;
  const medicineID = item._id;
  const medicineName = item.medication_name;
  const withdrawalMilk = item.withdrawal_days_dairy;
  const withdrawalMeat = item.withdrawal_days_meat;
  const medicineQuantity = item.remaining_quantity;
  const withdrawalPeriodActive = withdrawalMeat || withdrawalMilk !== '' ? 'Click Here' : 'N'

  const activeColor = withdrawalPeriodActive === "Active" ? medicineLevelLow : medicineLevelHigh;

  // ASSIGN MEDICATION MODAL
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const bottomSheetModalRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChange', index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // DISABLE ASSIGN MEDICATION IF QUANTITY 0
  const medicineEmpty = () => {
    Alert.alert(
      "Unable to Give Medication",
      "Medicine quantity is 0, you are not able to use this medicine",
      [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  };

  const handleMedicineAction =
    medicineQuantity === 0 ? medicineEmpty : handlePresentModalPress;

  // SEARCH HANDLES
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [renderList, setRenderList] = useState("");
  const [searchFor, setSearchFor] = useState("");

  // GET HERD LIST
  const { data, loading } = useQuery(GET_HERD);

  // GET ACTIVE MEDICATION LIST
  const { data: activeMedication, loading: loadActiveMedication} = useQuery(GET_ACTIVE_MEDICATIONS_MEDICINE, {
    variables: {medication_id}
  })

  // LOAD ALL QUERIES
  if (loading || loadActiveMedication) {
    return <PageLoader />;
  }

  // LISTS
  const AnimalList = data.herd.animals;
  const ActiveMedicationList = activeMedication.administeredMedicationsActiveWithdrawalByMedication.administeredMedications
  
  const onClickGiveMedicine = () => {
    setListData(AnimalList);
    setSearchFor("Search for Animal");
    setRenderList("medicine");
    setSearchText("");
    setFilteredData([]);
    handlePresentModalPress();
  };

  const onClickActiveMedicine = () => {
    setListData(ActiveMedicationList);
    setSearchFor("Search for Medicated Animals");
    setRenderList("activeMedication");
    setSearchText("");
    setFilteredData([]);
    handlePresentModalPress();
  };

  const renderModalList = ({item}) => {
    if (renderList === 'medicine') {
      const cowLogo =
      item.male_female === "F"
        ? "https://i.ibb.co/B4cgVmv/cow-5.png"
        : "https://i.ibb.co/g6MntkZ/cow-6.png";

      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AssignMedicationForm", {
              animalID: item._id,
              animalTag: item.tag_number,
              medicineID: medicineID,
              medicineName: medicineName,
              withdrawalMeat: withdrawalMeat,
              withdrawalMilk: withdrawalMilk,
              medicineQuantity: medicineQuantity,
              medicineQuantityType: medicineQuantityType,
              medicineType: medicineType,
              color: medicineLevelColor,
            })
          }
          style={{ flexDirection: "row", marginBottom: 40, alignItems: "center" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: cowLogo }} style={{ height: 50, width: 50 }} />
            <View>
              <Text
                style={{
                  fontFamily: "Sora-SemiBold",
                  fontSize: 18,
                  color: "white",
                  left: SPACING,
                }}
              >
                ID: <Text style={{ color: "#F4F3BE" }}>{item.tag_number}</Text>
              </Text>
              <View
                style={{
                  borderBottomColor: "#9D9D9D",
                  opacity: 0.4,
                  borderBottomWidth: 1,
                  top: 45,
                  width: 300,
                }}
              />
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
          </View>
          <Feather
            name="chevron-right"
            size={30}
            color="#F4F3BE"
            style={{ position: "absolute", right: 0, bottom: SPACING }}
          />
        </TouchableOpacity>
      );
    } 
    const tagNumber = item.animal[0].tag_number;
    const breedType = item.animal[0].breed_type;
    const cowLogo =
    item.animal[0].male_female === "F"
      ? "https://i.ibb.co/B4cgVmv/cow-5.png"
      : "https://i.ibb.co/g6MntkZ/cow-6.png";
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home", {
            screen: "MedicineUsageDetail",
            params: {
              animalTagNumber: tagNumber,
              medicineName: medicineName,
              administeredBy: item.administered_by,
              dateAdministered: Moment(item.date_of_administration).format('YYYY-MM-DD'),
              quantityAdministered: item.quantity_administered,
              quantityType: item.quantity_type,
              medicineType: item.medicine_type,
              reason: item.reason_for_administration,
            },
          })
        }
        style={{ flexDirection: "row", marginBottom: 40, alignItems: "center" }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: cowLogo }} style={{ height: 50, width: 50 }} />
          <View>
            <Text
              style={{
                fontFamily: "Sora-SemiBold",
                fontSize: 18,
                color: "white",
                left: SPACING,
              }}
            >
              ID: <Text style={{ color: "#F4F3BE" }}>{tagNumber}</Text>
            </Text>
            <View
              style={{
                borderBottomColor: "#9D9D9D",
                opacity: 0.4,
                borderBottomWidth: 1,
                top: 45,
                width: 300,
              }}
            />
            <Text
              style={{
                fontFamily: "Sora-SemiBold",
                fontSize: 18,
                color: "white",
                left: SPACING,
              }}
            >
              Breed Type:{" "}
              <Text style={{ color: "#F4F3BE" }}>{breedType}</Text>
            </Text>
          </View>
        </View>
        <Feather
          name="chevron-right"
          size={30}
          color="#F4F3BE"
          style={{ position: "absolute", right: 0, bottom: SPACING }}
        />
      </TouchableOpacity>
    );
  }

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

  const DisplayActiveMedication = () => {
    if(!ActiveMedicationList.length) {
      return (
        <Text style={styles.value}>None</Text>
      )
    }
    return (
      <TouchableOpacity onPress={onClickActiveMedicine}>
        <Text style={[styles.value, {color: '#F4F3BE'}]}>Click Here</Text>
      </TouchableOpacity>
    )
  }

  let searchBar
  if (renderList === 'medicine') {
    searchBar = 
      <BottomSheetTextInput
        style={styles.input}
        placeholder={searchFor}
        clearButtonMode="always"
        onChangeText={search}
        value={searchText}
        placeholderTextColor="#848D95"
        returnKeyType="search"
      />
  } else {
    searchBar = <Text style={{padding: SPACING, fontFamily: "Sora-SemiBold", color: 'white', fontSize: 25}}>Active Medicines</Text>
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: defaultBackground, flex: 1 }}>
        {/* HEADER */}
        <View
          style={[
            styles.navBar,
            {
              marginTop:
                Platform.OS === "android"
                  ? getStatusBarHeight()
                  : getStatusBarHeight() - 20,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={navigation.goBack}
          >
            <MaterialIcons name="arrow-back-ios" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.name}>{item.medication_name}</Text>
          <View style={styles.rightContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Medicine", {
                  screen: "EditMedicineForm",
                  params: { item },
                })
              }
            >
              <MaterialIcons name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Sora-Bold",
            textAlign: "center",
            color: medicineLevelColor,
            paddingBottom: SPACING,
          }}
        >
          {medicineLevelLabel}
        </Text>

        {/* CONTENT */}
        <ScrollView style={{ padding: SPACING, marginBottom: SPACING }}>
          <Button
            contentStyle={{ height: 50, width: 25 }}
            icon="pill"
            mode="contained"
            color="#F4F3BE"
            style={{ marginTop: SPACING, borderRadius: 10 }}
            contentStyle={{ height: 50 }}
            labelStyle={{
              fontFamily: "Sora-Bold",
              fontSize: 17,
              color: cardBackground,
            }}
            onPress={onClickGiveMedicine}
          >
            Give Medication
          </Button>
          {/* DETAILS */}
          <View
            style={{
              marginBottom: CELL_HEIGHT / 10,
              marginTop: 30,
              height: 235,
            }}
          >
            <View style={{ flex: 1, padding: SPACING }}>
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: cardBackground, borderRadius: 15 },
                ]}
              ></View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.key}>Expiry Date</Text>
                  <Text style={styles.key}>Withdrawal Period</Text>
                  <Text style={styles.key}>Meat</Text>
                  <Text style={styles.key}>Milk</Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <Text style={styles.value}>{purchase_date}</Text>
                  <DisplayActiveMedication />
                  <Text style={styles.value}>
                    {item.withdrawal_days_meat} days
                  </Text>
                  <Text style={styles.value}>
                    {item.withdrawal_days_dairy} days
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: CELL_HEIGHT / 10, height: 245 }}>
            <View style={{ flex: 1, padding: SPACING }}>
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: cardBackground, borderRadius: 15 },
                ]}
              ></View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.key}>Quantity</Text>
                  <Text style={styles.key}>Purchase Date</Text>
                  <Text style={styles.key}>Supplied By</Text>
                  <Text style={styles.key}>Batch No</Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <Text style={styles.value}>
                    {item.remaining_quantity} / {item.quantity}{" "}
                    {medicineQuantityType}
                  </Text>
                  <Text style={styles.value}>{purchase_date}</Text>
                  <Text style={styles.value}>{item.supplied_by}</Text>
                  <Text style={styles.value}>{item.batch_number}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontFamily: "Sora-SemiBold",
              color: "#F4F3BE",
              paddingVertical: SPACING,
            }}
          >
            Comments
          </Text>
          <View style={{ marginBottom: CELL_HEIGHT / 10, height: 150 }}>
            <View style={{ flex: 1, padding: SPACING }}>
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: cardBackground, borderRadius: 15 },
                ]}
              ></View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.key}>{item.comments}</Text>
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
            {searchBar}
          </View>
          <BottomSheetFlatList
            showsVerticalScrollIndicator={true}
            data={
              filteredData && filteredData.length > 0 ? filteredData : listData
            }
            keyExtractor={(item, index) => item._id}
            renderItem={renderModalList}
            contentContainerStyle={modalStyles.contentContainer}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
