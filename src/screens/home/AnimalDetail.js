import React, { useCallback, useMemo, useRef, useState } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
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

// QUERY
import { useQuery } from "@apollo/client";
import {
  GET_ACTIVE_MEDICATIONS_MEDICINE,
  GET_MEDICATIONS,
} from "../../config/graphql/queries";
import {
  GET_LAST_MEDICATION_ANIMAL,
  GET_ANIMAL_BY_PROGENY,
  GET_ACTIVE_MEDICATIONS_ANIMAL,
} from "../../config/graphql/queries";

// THEME
import {
  SPACING,
  height,
  defaultBackground,
  cardBackground,
  topOS,
  CELL_HEIGHT,
  medicineEmpty,
  medicineLevelLow,
  medicineLevelMedium,
  medicineLevelHigh,
} from "../../config/theme";

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontFamily: "Sora-Bold",
    color: "white",
    textAlign: "center",
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
    alignSelf: "flex-end",
  },
  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: topOS,
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

export default function AnimalDetail({ navigation, route }) {
  Moment.locale("en");

  const {
    item,
    date_of_birth,
    cowLogo,
    last_calved,
    male_female,
  } = route.params;
  const description = item.description === "null" ? "" : item.description;
  const id = item._id;
  const animal_id = item._id;
  const tag_number = item.tag_number;

  // ASSIGN MEDICATION MODAL
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const bottomSheetModalRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChange', index);
  }, []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // SEARCH HANDLES
  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [renderList, setRenderList] = useState("");
  const [searchFor, setSearchFor] = useState("");

  // GET MEDICINE LIST
  const { data, loading } = useQuery(GET_MEDICATIONS);

  // GET LAST MEDICATION DETAIL
  const { data: lastMedication, loading: loadLastMedication } = useQuery(
    GET_LAST_MEDICATION_ANIMAL,
    {
      variables: { id },
      onCompleted(data) {
        console.log(data);
      },
    }
  );

  // GET PROGENY LIST
  const { data: progenyList, loading: loadProgeny } = useQuery(
    GET_ANIMAL_BY_PROGENY,
    {
      variables: { tag_number },
    }
  );

  // GET ACTIVE MEDICATION LIST
  const { data: activeMedication, loading: loadActiveMedication } = useQuery(
    GET_ACTIVE_MEDICATIONS_ANIMAL,
    {
      variables: { animal_id },
    }
  );

  // LOAD ALL QUERIES
  if (loading || loadLastMedication || loadProgeny || loadActiveMedication) {
    return <PageLoader />;
  }

  // LISTS
  const MedicineList = data.medications.medications;
  const ProgenyList = progenyList.animalByProgeny.animals;
  const ActiveMedicationList =
    activeMedication.administeredMedicationsActiveWithdrawalByAnimal
      .administeredMedications;

  const onClickGiveMedicine = () => {
    setListData(MedicineList);
    setSearchFor("Search for Medicine");
    setRenderList("medicine");
    setSearchText("");
    setFilteredData([]);
    handlePresentModalPress();
  };

  const onClickProgeny = () => {
    setListData(ProgenyList);
    setSearchFor("Search for Progeny");
    setRenderList("progeny");
    setSearchText("");
    setFilteredData([]);
    handlePresentModalPress();
  };

  const onClickActiveMedicine = () => {
    setListData(ActiveMedicationList);
    setSearchFor("Search for Active Medication");
    setRenderList("activeMedication");
    setSearchText("");
    setFilteredData([]);
    handlePresentModalPress();
  };

  // BOTTOM SHEET LIST RENDER
  const renderModalList = ({ item }) => {
    if (renderList === "progeny") {
      const cowLogo = item.male_female === 'M' ? 'https://i.ibb.co/NnqjqXC/maleCow.png' : 'https://i.ibb.co/V989V52/female-Cow.png';
      const date_of_birth = Moment(item.date_of_birth).format('YYYY-MM-DD');
      const last_calved = item.last_calved !== undefined ? Moment(item.last_calved).format('YYYY-MM-DD') : 'N/A';
      const male_female = item.male_female === 'M' ? 'Male' : 'Female';
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginBottom: 40,
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Home", {
              screen: "AnimalDetail",
              params: {
                item,
                date_of_birth,
                cowLogo,
                last_calved,
                male_female,
              },
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: cowLogo }}
              style={{ height: 50, width: 50 }}
            />
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
    } else if (renderList === "medicine") {
      const midLevel = item.quantity / 2;
      const medicineLevelColor =
        item.remaining_quantity === 0
          ? medicineEmpty
          : item.remaining_quantity < midLevel && item.remaining_quantity > 0
          ? medicineLevelLow
          : item.remaining_quantity === midLevel
          ? medicineLevelMedium
          : medicineLevelHigh;
      const medicineQuantityType =
        item.quantity_type === "UNASSIGNED" ? "" : item.quantity_type;

      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Medicine", {
              screen: "AssignMedicationForm",
              params: {
                animalID: animal_id,
                animalTag: tag_number,
                medicineID: item._id,
                medicineName: item.medication_name,
                medicineType: item.medicine_type,
                withdrawalMeat: item.withdrawal_days_meat,
                withdrawalMilk: item.withdrawal_days_dairy,
                medicineQuantity: item.remaining_quantity,
                medicineQuantityType: medicineQuantityType,
                color: medicineLevelColor,
              },
            })
          }
          style={{
            flexDirection: "row",
            marginBottom: 40,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: cardBackground,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                borderLeftColor: medicineLevelColor,
                borderLeftWidth: 3,
              }}
            >
              <Text
                style={{
                  fontFamily: "Sora-SemiBold",
                  fontSize: 18,
                  color: "white",
                  left: SPACING,
                }}
              >
                Medicine:{" "}
                <Text style={{ color: "#F4F3BE" }}>{item.medication_name}</Text>
              </Text>
              <View
                style={{
                  borderBottomColor: "#9D9D9D",
                  opacity: 0.4,
                  borderBottomWidth: 1,
                  top: 45,
                  width: 350,
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
                Quantity:{" "}
                <Text style={{ color: "#F4F3BE" }}>
                  {item.remaining_quantity} / {item.quantity}{" "}
                  {medicineQuantityType}
                </Text>
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
    const medicineName = item.medication[0].medication_name;
    const dateAdministered = Moment(item.date_of_administration).format(
      "YYYY-MM-DD"
    );
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home", {
            screen: "MedicineUsageDetail",
            params: {
              animalTagNumber: tag_number,
              medicineName: medicineName,
              administeredBy: item.administered_by,
              dateAdministered: dateAdministered,
              quantityAdministered: item.quantity_administered,
              quantityType: item.quantity_type,
              medicineType: item.medicine_type,
              reason: item.reason_for_administration,
              withdrawalEndDairy: item.withdrawal_end_dairy,
              withdrawalEndMeat: item.withdrawal_end_meat,
            },
          })
        }
        style={{ flexDirection: "row", marginBottom: 40, alignItems: "center" }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text
              style={{
                fontFamily: "Sora-SemiBold",
                fontSize: 18,
                color: "white",
                left: SPACING,
              }}
            >
              Medicine: <Text style={{ color: "#F4F3BE" }}>{medicineName}</Text>
            </Text>
            <View
              style={{
                borderBottomColor: "#9D9D9D",
                opacity: 0.4,
                borderBottomWidth: 1,
                top: 45,
                width: 350,
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
              Date Administered:{" "}
              <Text style={{ color: "#F4F3BE" }}>{dateAdministered}</Text>
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
  };

  const DisplayLastMedication = () => {
    if (
      lastMedication.animalWithLastMedication.administeredMedications === null
    ) {
      return <Text style={styles.value}>None</Text>;
    }
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home", {
            screen: "MedicineUsageDetail",
            params: {
              animalTagNumber: tag_number,
              medicineName:
                lastMedication.animalWithLastMedication
                  .administeredMedications[0].medication[0].medication_name,
              administeredBy:
                lastMedication.animalWithLastMedication
                  .administeredMedications[0].administered_by,
              dateAdministered: Moment(
                lastMedication.animalWithLastMedication
                  .administeredMedications[0].date_of_administration
              ).format("YYYY-MM-DD"),
              quantityAdministered:
                lastMedication.animalWithLastMedication
                  .administeredMedications[0].quantity_administered,
              quantityType:
                lastMedication.animalWithLastMedication
                  .administeredMedications[0].quantity_type,
              reason:
                lastMedication.animalWithLastMedication
                  .administeredMedications[0].reason_for_administration,
              withdrawalEndDairy:
                lastMedication.animalWithLastMedication
                  .administeredMedications[0].withdrawal_end_dairy,
              withdrawalEndMeat:
                lastMedication.animalWithLastMedication
                  .administeredMedications[0].withdrawal_end_meat,
            },
          })
        }
      >
        <Text style={[styles.value, { color: "#F4F3BE" }]}>Click Here</Text>
      </TouchableOpacity>
    );
  };

  const DisplayProgeny = () => {
    if (ProgenyList.length == 0) {
      return <Text style={styles.value}>No Progeny</Text>;
    }
    return (
      <TouchableOpacity onPress={onClickProgeny}>
        <Text style={[styles.value, { color: "#F4F3BE" }]}>Click Here</Text>
      </TouchableOpacity>
    );
  };

  const DisplayActiveMedication = () => {
    if (ActiveMedicationList.length == 0) {
      return <Text style={styles.value}>None</Text>;
    }
    return (
      <TouchableOpacity onPress={onClickActiveMedicine}>
        <Text style={[styles.value, { color: "#F4F3BE" }]}>Click Here</Text>
      </TouchableOpacity>
    );
  };

  const search = (searchText) => {
    setSearchText(searchText);

    let filteredData = listData.filter(function (item) {
      let { medicine_name_search, tag_number_search, breed_type_search } = "";
      if (renderList === "progeny") {
        tag_number_search = item.tag_number.toString().includes(searchText);
        breed_type_search = item.breed_type.includes(searchText.toUpperCase());

        return tag_number_search || breed_type_search;
      } else {
        medicine_name_search = item.medication_name
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return tag_number_search || breed_type_search || medicine_name_search;
      }
    });

    setFilteredData(filteredData);
  };

  let searchBar;
  if (renderList === "medicine" || renderList === "progeny") {
    searchBar = (
      <BottomSheetTextInput
        style={styles.input}
        placeholder={searchFor}
        clearButtonMode="always"
        onChangeText={search}
        value={searchText}
        placeholderTextColor="#848D95"
        returnKeyType="search"
      />
    );
  } else {
    searchBar = (
      <Text
        style={{
          padding: SPACING,
          fontFamily: "Sora-SemiBold",
          color: "white",
          fontSize: 25,
        }}
      >
        Active Medicines
      </Text>
    );
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: defaultBackground, flex: 1 }}>
        {/* HEADER */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={navigation.goBack}
          >
            <MaterialIcons name="arrow-back-ios" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.name}>{item.tag_number}</Text>
          <View style={styles.rightContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Home", {
                  screen: "EditAnimalForm",
                  params: { item, date_of_birth },
                })
              }
            >
              <MaterialIcons name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            fontSize: 20,
            fontFamily: "Sora-Bold",
            alignItems: "center",
            color: "white",
            paddingBottom: SPACING,
          }}
        >
          <Image source={{ uri: cowLogo }} style={{ height: 40, width: 40 }} />
        </View>

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
              height: 380,
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
                  <Text style={styles.key}>Sire Number</Text>
                  <Text style={styles.key}>Dam Number</Text>
                  <Text style={styles.key}>Sex</Text>
                  <Text style={styles.key}>Date of Birth</Text>
                  <Text style={styles.key}>Breed</Text>
                  <Text style={styles.key}>Last Calved</Text>
                  <Text style={styles.key}>Pure Breed</Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <Text style={styles.value}>{item.sire_number}</Text>
                  <Text style={styles.value}>{item.mother_number}</Text>
                  <Text style={styles.value}>{male_female}</Text>
                  <Text style={styles.value}>{date_of_birth}</Text>
                  <Text style={styles.value}>{item.breed_type}</Text>
                  <Text style={styles.value}>{last_calved}</Text>
                  <Text style={styles.value}>
                    {item.pure_breed.toString().charAt(0).toUpperCase() +
                      item.pure_breed.toString().slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: CELL_HEIGHT / 10, height: 195 }}>
            <View style={{ flex: 1, padding: SPACING }}>
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: cardBackground, borderRadius: 15 },
                ]}
              ></View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={styles.key}>Active Medication</Text>
                  <Text style={styles.key}>Last Medication</Text>
                  <Text style={styles.key}>View Progeny</Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <DisplayActiveMedication />
                  <DisplayLastMedication />
                  <DisplayProgeny />
                </View>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Sora-Bold",
              color: "#F4F3BE",
              paddingVertical: SPACING,
            }}
          >
            Description
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
                  <Text style={styles.key}>{description}</Text>
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
          <View style={styles.containerModal}>{searchBar}</View>
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
