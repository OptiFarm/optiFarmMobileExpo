import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";

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

// SIZING
export const CELL_HEIGHT = height * 0.18;

// QUERY
import { useMutation } from "@apollo/client";
import { SAVE_OR_UPDATE_MEDICATION_USAGE } from "../../config/graphql/mutation";

import { PageLoader } from "../../components/atoms/PageLoader";
import { Alert } from "react-native";

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

export default function AssignMedicationConfirm({ navigation, route }) {
  // GET ALL REQUIED VALUE
  const {
    animalID,
    data,
    medicineQuantityType,
    medicineID,
    animalTag,
    medicineType,
  } = route.params;

  // ADD ADMINISTRITION_MEDICATION
  const [addMedicineUsage, { loading }] = useMutation(
    SAVE_OR_UPDATE_MEDICATION_USAGE,
    {
      onCompleted(data) {
        if (!data.saveAdminMed.responseCheck.success) {
          Alert.alert(
            "Unable to Give Medication",
            data.saveAdminMed.responseCheck.message
          );
        } else {
          const fromScreen = "Medicine Usage";

          navigation.navigate("Home", {
            screen: "FormSuccess",
            params: { fromScreen },
          });
        }
      },
    }
  );

  // REACT HOOK FORM FUNCION
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    const date_of_administration = data.date_of_administration;
    const quantity_administered = parseInt(data.quantity_administered);
    const administered_by = data.administered_by;
    const reason_for_administration = String(data.reason_for_administration);
    const animal_id = animalID;
    const medication_id = medicineID;

    addMedicineUsage({
      variables: {
        date_of_administration: date_of_administration,
        quantity_administered: quantity_administered,
        administered_by: administered_by,
        reason_for_administration: reason_for_administration,
        animal_id: animal_id,
        medication_id: medication_id,
      },
    });

    if (loading) {
      <PageLoader />;
    }
  };

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
        <View
          style={{
            flex: 1,
            padding: SPACING,
            height: height - 200,
            top: SPACING,
          }}
        >
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: cardBackground, borderRadius: 15 },
            ]}
          />

          <Text style={styles.name}>{data.medication}</Text>
          <Text style={styles.medicineType}>{medicineType}</Text>

          <View style={styles.border} />

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.medicineLabel}>Animal ID</Text>
              <Text style={[styles.medicineDesc, { color: "#F3F4B8" }]}>
                {animalTag}
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
                {data.administered_by}
              </Text>
            </View>
          </View>

          <Text style={styles.medicineLabel}>Quantity</Text>
          <Text style={styles.medicineDesc}>
            {data.quantity_administered} {medicineQuantityType}
          </Text>

          <Text style={styles.medicineLabel}>Date of Administration</Text>
          <Text style={styles.medicineDesc}>{data.date_of_administration}</Text>

          <Text style={styles.medicineLabel}>Comment</Text>
          <Text style={styles.medicineDesc}>
            {data.reason_for_administration}
          </Text>
        </View>

        <Button
          contentStyle={{ height: 50, width: 25 }}
          mode="contained"
          color="#F4F3BE"
          style={{ marginTop: 30, borderRadius: 10 }}
          contentStyle={{ height: 50 }}
          labelStyle={{
            fontFamily: "Sora-Bold",
            fontSize: 17,
            color: cardBackground,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          Confirm
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
