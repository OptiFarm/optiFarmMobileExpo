import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { PageHeader } from "../../components/atoms/PageHeader";
import RNPickerSelect from "react-native-picker-select";
import { Button } from "react-native-paper";

// QUERY
import { useMutation } from "@apollo/client";
import { SAVE_OR_UPDATE_MEDICATION } from "../../config/graphql/mutation";

// THEME
import {
  SPACING,
  height,
  defaultBackground,
  cardBackground,
  width,
  topOS,
} from "../../config/theme";

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
    marginTop: SPACING,
    marginBottom: 10,
    marginHorizontal: 20,
    marginLeft: 0,
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    opacity: 0.8,
  },
  input: {
    backgroundColor: cardBackground,
    height: 65,
    padding: 10,
    borderRadius: 15,
    fontFamily: "Sora-SemiBold",
    fontSize: 20,
    color: "white",
    marginBottom: 25,
  },
  button: {
    marginTop: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#F3F4B8",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderRadius: 15,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: cardBackground,
    height: 65,
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    marginBottom: 25,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderRadius: 15,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: cardBackground,
    height: 65,
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    marginBottom: 25,
  },
});

export default function MedicineForm({ navigation }) {
  // ADD ANIMAL DATA MUTATION
  const [addMedicine, { data }] = useMutation(SAVE_OR_UPDATE_MEDICATION);

  // REACT HOOK FORM FUNCTIONS
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    errors,
  } = useForm();
  const onSubmit = (data) => {
    const medication_name = data.medicineName;
    const medicine_type = data.medicineType;
    const supplied_by = data.suppliedBy;
    const quantity = parseInt(data.quantity);
    const quantity_type = data.quantityType;
    const withdrawal_days_meat = parseInt(data.withdrawalForMeat);
    const withdrawal_days_dairy = parseInt(data.withdrawalForMilk);
    const batch_number = data.batchNo;
    const expiry_date = data.expiryDate;
    const dateOfPurchase = data.dateOfPurchase;
    const comments = String(data.notes);

    addMedicine({
      variables: {
        medication_name: medication_name,
        medicine_type: medicine_type,
        supplied_by: supplied_by,
        quantity: quantity,
        quantity_type: quantity_type,
        withdrawal_days_meat: withdrawal_days_meat,
        withdrawal_days_dairy: withdrawal_days_dairy,
        batch_number: batch_number,
        expiry_date: expiry_date,
        purchase_date: dateOfPurchase,
        comments: comments,
      },
    });

    const fromScreen = "Medicine";

    navigation.navigate("Home", {
      screen: "FormSuccess",
      params: { fromScreen },
    });
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const placeholderType = {
    label: "Select quantity type",
    value: null,
  };

  const placeholderQuantity = {
    label: "Select quantity type",
    value: null,
  };

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

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
            label="Add Medicine"
            goBack={navigation.goBack}
            showChevron="true"
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ padding: SPACING }}>
          <>
            <Text style={styles.label}>Medicine Name</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  autoFocus={true}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="next"
                  placeholder="enter alphanumeric characters"
                  placeholderTextColor="#848D95"
                  blurOnSubmit={false}
                />
              )}
              name="medicineName"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Medicine Type</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <RNPickerSelect
                  items={[
                    { label: "Vaccination", value: "VACCINATION" },
                    { label: "Antibiotic", value: "ANTIBIOTIC" },
                    { label: "Dose", value: "DOSE" },
                  ]}
                  onValueChange={(value) => onChange(value)}
                  style={styles.input}
                  onBlur={onBlur}
                  style={pickerSelectStyles}
                  placeholder={placeholderType}
                />
              )}
              name="medicineType"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Date of Purchase</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="next"
                  placeholder="date in format YYYY-MM-DD"
                  placeholderTextColor="#848D95"
                  onSubmitEditing={() => ref_input2.current.focus()}
                />
              )}
              name="dateOfPurchase"
              rules={{ required: true }}
              defaultValue={null}
            />      

            <Text style={styles.label}>Expiry Date</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="next"
                  placeholder="date in format YYYY-MM-DD"
                  placeholderTextColor="#848D95"
                  ref={ref_input2}
                  onSubmitEditing={() => ref_input3.current.focus()}
                />
              )}
              name="expiryDate"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Quantity</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  keyboardType="decimal-pad"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="done"
                  placeholder="enter numeric value, e.g. 10"
                  placeholderTextColor="#848D95"
                  ref={ref_input3}
                />
              )}
              name="quantity"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Quantity Type</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <RNPickerSelect
                  items={[
                    { label: "ML", value: "ML" },
                    { label: "MG", value: "MG" },
                    { label: "Count", value: "COUNT" },
                    { label: "Unassigned", value: "UNASSIGNED" },
                  ]}
                  onValueChange={(value) => onChange(value)}
                  style={styles.input}
                  onBlur={onBlur}
                  style={pickerSelectStyles}
                  placeholder={placeholderQuantity}
                />
              )}
              name="quantityType"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Withdrawal For Meat</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  keyboardType="decimal-pad"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="done"
                  placeholder="enter numeric value, e.g. 10"
                  placeholderTextColor="#848D95"
                  onSubmitEditing={() => ref_input4.current.focus()}
                  blurOnSubmit={false}
                />
              )}
              name="withdrawalForMeat"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Withdrawal For Milk</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  keyboardType="decimal-pad"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="done"
                  placeholder="enter numeric value, e.g. 10"
                  placeholderTextColor="#848D95"
                  ref={ref_input4}
                  onSubmitEditing={() => ref_input5.current.focus()}
                  blurOnSubmit={false}
                />
              )}
              name="withdrawalForMilk"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Batch</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="next"
                  placeholder="enter medication batch"
                  placeholderTextColor="#848D95"
                  ref={ref_input5}
                  onSubmitEditing={() => ref_input6.current.focus()}
                />
              )}
              name="batchNo"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Supplied By</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="next"
                  placeholder="enter supplier of medication"
                  placeholderTextColor="#848D95"
                  ref={ref_input6}
                  onSubmitEditing={() => ref_input7.current.focus()}
                  blurOnSubmit={false}
                />
              )}
              name="suppliedBy"
              rules={{ required: true }}
              defaultValue={null}
            />  

            <Text style={styles.label}>Notes</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="done"
                  ref={ref_input7}
                />
              )}
              name="notes"
              rules={{ required: false }}
              defaultValue={null}
            />

            <Button
              contentStyle={{ height: 50, width: 25 }}
              mode="contained"
              color="#F4F3BE"
              style={{ marginVertical: SPACING, borderRadius: 10 }}
              contentStyle={{ height: 50 }}
              labelStyle={{
                fontFamily: "Sora-Bold",
                fontSize: 17,
                color: cardBackground,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
