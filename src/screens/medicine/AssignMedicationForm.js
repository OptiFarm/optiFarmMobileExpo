import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import { PageHeader } from "../../components/atoms/PageHeader";
import { Button } from "react-native-paper";

// THEME
import {
  SPACING,
  height,
  defaultBackground,
  cardBackground,
  width,
  topOS,
} from "../../config/theme";

// DATA
import { ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { DatePickerIOS } from "react-native";

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
  label: {
    color: "white",
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 20,
    marginLeft: 0,
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    opacity: 0.8,
  },
  input: {
    backgroundColor: cardBackground,
    height: 50,
    padding: 10,
    borderRadius: 15,
    fontFamily: "Sora-SemiBold",
    fontSize: 20,
    color: "white",
  },
  button: {
    marginTop: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#F3F4B8",
  },
});

export default function AssignMedicationForm({ navigation, route }) {
  const {
    animalID,
    animalTag,
    medicineName,
    medicineID,
    medicineQuantity,
    medicineQuantityType,
    color,
  } = route.params;
  console.log(route.params);
  // REACT HOOK FORM FUNCTIONS
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    navigation.navigate("AssignMedicationConfirm", {
      data,
      animalID,
      medicineID,
      animalTag,
      medicineQuantityType,
    });
  };

  // GET DATE
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getDate();

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

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
            label="Assign Medicine"
            goBack={navigation.goBack}
            showChevron="true"
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ paddingHorizontal: SPACING }}>
          <Text style={styles.label}>Animal ID</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                value={value}
                editable={false}
              />
            )}
            name="animal"
            rules={{ required: true }}
            defaultValue={animalTag.toString()}
          />

          <Text style={styles.label}>Medicine Name</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                value={value}
                editable={false}
              />
            )}
            name="medication"
            rules={{ required: true }}
            defaultValue={medicineName}
          />

          {/* <Text style={styles.label}>Withdrawal For Meat</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            editable={false}
                        />
                        )}
                        name="withdrawalMeat"
                        rules={{ required: true }}
                        defaultValue={withdrawalMeat.toString() + ' Days'}
                    /> */}

          {/* <Text style={styles.label}>Withdrawal For Milk</Text>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            value={value}
                            editable={false}
                        />
                        )}
                        name="withdrawalMilk"
                        rules={{ required: true }}
                        defaultValue={withdrawalMilk.toString() + ' Days'}
                    />           */}

          <Text style={styles.label}>
            Quantity
            <Text style={{ color: color, fontSize: 13 }}>
              {" "}
              Remaining: {medicineQuantity} {medicineQuantityType}
            </Text>
          </Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                value={value}
                autoFocus={true}
                onChangeText={(value) => onChange(value)}
                keyboardType="decimal-pad"
                returnKeyType="done"
                placeholder="1"
                placeholderTextColor="#848D95"
                onSubmitEditing={() => ref_input2.current.focus()}
                blurOnSubmit={false}
              />
            )}
            name="quantity_administered"
            rules={{ required: true }}
            defaultValue={null}
          />

          <Text style={styles.label}>
            Administered By
            <Text style={{ color: "#D74747", fontSize: 13 }}> Required</Text>
          </Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                returnKeyType="next"
                placeholder="Derek"
                placeholderTextColor="#848D95"
                ref={ref_input2}
                onSubmitEditing={() => ref_input3.current.focus()}
              />
            )}
            name="administered_by"
            rules={{ required: true }}
            defaultValue={null}
          />

          <Text style={styles.label}>Note</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                value={value}
                onChangeText={(value) => onChange(value)}
                returnKeyType="done"
                ref={ref_input3}
              />
            )}
            name="reason_for_administration"
            rules={{ required: true }}
            defaultValue={null}
          />

          <Text style={styles.label}>Date of Administration</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                value={value}
                editable={false}
              />
            )}
            name="date_of_administration"
            rules={{ required: true }}
            defaultValue={date}
          />

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
            Done
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
