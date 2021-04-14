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

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Home", {
          screen: "MedicineUsageDetail",
          params: {
            administeredBy: item.administered_by,
            dateAdministered: date_of_administration,
            quantityAdministered: item.quantity_administered,
            quantityType: item.quantity_type,
            reason: item.reason_for_administration,
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

        <Text style={styles.name}>{item.medication}</Text>
        <Text style={styles.medicineType}>Medicament</Text>

        <View style={styles.border} />

        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.medicineLabel}>Animal ID</Text>
            <Text style={[styles.medicineDesc, { color: "#F3F4B8" }]}>
              {item.animal_id}
            </Text>
          </View>
          <View style={{ position: "absolute", right: 0 }}>
            <Text style={styles.medicineLabel}>Quantity</Text>
            <Text
              style={[
                styles.medicineDesc,
                { position: "absolute", right: 0, top: 60 },
              ]}
            >
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
