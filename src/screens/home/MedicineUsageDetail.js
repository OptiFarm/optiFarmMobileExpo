import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTS
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { PageHeader } from "../../components/atoms/PageHeader";
import { Button } from "react-native-paper";

// THEME
import {
  SPACING,
  width,
  height,
  defaultBackground,
  cardBackground,
  topOS,
} from "../../config/theme";
import { ScrollView } from "react-native";
import moment from "moment";

// SIZING
export const CELL_HEIGHT = height * 0.18;

const styles = StyleSheet.create({
  header_inner: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    marginTop: topOS,
  },
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
  },
});

export default function MedicineUsageDetail({ navigation, route }) {
  const {
    administeredBy,
    dateAdministered,
    quantityAdministered,
    quantityType,
    reason,
    animalTagNumber,
    withdrawalEndDairy,
    withdrawalEndMeat,
    medicineName,
  } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SPACING,
          marginBottom: SPACING,
        }}
      >
        <View style={styles.header_inner}>
          <PageHeader
            label="Medication Details"
            goBack={navigation.goBack}
            showChevron="true"
          />
        </View>
      </View>

      {/* CONFIRMATION CARD */}
      <ScrollView style={{ paddingHorizontal: SPACING }}>
        <View style={{ flex: 1, padding: SPACING, height: 650, top: SPACING }}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: cardBackground, borderRadius: 15 },
            ]}
          />

          <Text style={styles.name}>{medicineName}</Text>
          <Text style={styles.medicineType}>DOSE</Text>

          <View style={styles.border} />

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.medicineLabel}>Tag Number</Text>
              <Text style={[styles.medicineDesc, { color: "#F3F4B8" }]}>
                {animalTagNumber}
              </Text>
            </View>
            <View style={{ position: "absolute", right: 0 }}>
              <Text style={styles.medicineLabel}>Administered By</Text>
              <Text
                style={[
                  styles.medicineDesc,
                  { position: "absolute", right: 0, top: 60 },
                ]}
              >
                {administeredBy}
              </Text>
            </View>
          </View>

          <Text style={styles.medicineLabel}>Withdrawal End Days Dairy</Text>
          <Text style={styles.medicineDesc}>
            {withdrawalEndDairy === null
              ? "N/A"
              : moment(withdrawalEndDairy).format("YYYY-MM-DD")}
          </Text>

          <Text style={styles.medicineLabel}>Withdrawal End Days Meat</Text>
          <Text style={styles.medicineDesc}>
            {withdrawalEndMeat === null
              ? "N/A"
              : moment(withdrawalEndMeat).format("YYYY-MM-DD")}
          </Text>

          <Text style={styles.medicineLabel}>Date of Administration</Text>
          <Text style={styles.medicineDesc}>{dateAdministered}</Text>

          <Text style={styles.medicineLabel}>Quantity Administered</Text>
          <Text style={styles.medicineDesc}>
            {quantityAdministered} {quantityType}
          </Text>

          <Text style={styles.medicineLabel}>Reason</Text>
          <Text style={styles.medicineDesc}>{reason}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
