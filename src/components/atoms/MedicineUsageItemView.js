import React from "react";
import Moment from "moment";

// COMPONENTS
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

// THEME
import {
  SPACING,
  width,
  height,
  cardBackground,
  CELL_HEIGHT,
} from "../../config/theme";
import moment from "moment";

const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    fontFamily: "Sora-Bold",
    color: "#F3F4B8",
    paddingTop: SPACING,
  },
  medicineType: {
    fontSize: 18,
    top: 5,
    opacity: 0.8,
    color: "white",
    fontFamily: "Sora-SemiBold",
  },
  medicineLabel: {
    fontSize: 18,
    paddingTop: 35,
    color: "white",
    opacity: 0.8,
    fontFamily: "Sora-SemiBold",
  },
  medicineDesc: {
    color: "white",
    fontSize: 18,
    fontFamily: "Sora-Bold",
    top: 5,
  },
  border: {
    borderBottomColor: "#9D9D9D",
    borderBottomWidth: 1,
    top: 20,
    opacity: 0.4,
  },
});

export const MedicineUsageItemView = ({ navigation, item }) => {
  // FORMAT DATE TIME
  Moment.locale("en");
  var dt = item.date_of_administration;
  const date_of_administration = Moment(dt).format("YYYY-MM-DD");

  const animalTag =
    item.animal !== undefined ? item.animal[0].tag_number : "null";
  const medicineName = item.medication[0].medication_name;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Home", {
          screen: "MedicineUsageDetail",
          params: {
            animalTagNumber: animalTag,
            medicineName: medicineName,
            administeredBy: item.administered_by,
            dateAdministered: date_of_administration,
            quantityAdministered: item.quantity_administered,
            quantityType: item.quantity_type,
            reason: item.reason_for_administration,
            withdrawalEndDairy: item.withdrawal_end_dairy,
            withdrawalEndMeat: item.withdrawal_end_meat,
          },
        })
      }
      style={{ marginBottom: 20, height: 300 }}
    >
      <View
        style={{ flex: 1, padding: SPACING, height: height - 50, top: SPACING }}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: cardBackground, borderRadius: 15 },
          ]}
        />

        <Text style={styles.name}>{medicineName}</Text>
        <Text style={styles.medicineType}>Medicine</Text>

        <View style={styles.border} />

        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.medicineLabel}>Tag Number</Text>
            <Text style={[styles.medicineDesc, { color: "#F3F4B8" }]}>
              {animalTag}
            </Text>
          </View>
          <View style={{ position: "absolute", right: 0 }}>
            <Text style={[styles.medicineLabel, { alignSelf: "flex-end" }]}>
              Quantity
            </Text>
            <Text style={[styles.medicineDesc, { alignSelf: "flex-end" }]}>
              {item.quantity_administered} {item.quantity_type}
            </Text>
          </View>
        </View>

        <Text style={styles.medicineLabel}>Date of Administration</Text>
        <Text style={styles.medicineDesc}>{date_of_administration}</Text>
      </View>
    </TouchableOpacity>
  );
};
