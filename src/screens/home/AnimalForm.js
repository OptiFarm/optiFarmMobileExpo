import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";

// COMPONENTS
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { PageHeader } from "../../components/atoms/PageHeader";
import { Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

// QUERY
import { useMutation } from "@apollo/client";
import { ADD_OR_UPDATE_ANIMAL } from "../../config/graphql/mutation";

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
    height: 50,
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
    height: 50,
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
    height: 50,
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    marginBottom: 25,
  },
});

export default function AnimalForm({ navigation }) {
  // ADD ANIMAL DATA MUTATION
  const [addAnimal, { data }] = useMutation(ADD_OR_UPDATE_ANIMAL);
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
    const breed_type = data.breed;
    const date_of_birth = data.dateOfBirth;
    const description = data.description;
    const mother_number = parseInt(data.motherNumber);
    const pure_breed = data.pureBreed;
    const male_female = data.sex;
    const sire_number = parseInt(data.sireNumber);
    const tag_number = parseInt(data.tagNumber);
    const animal_name = "TEST";

    addAnimal({
      variables: {
        breed_type: breed_type,
        date_of_birth: date_of_birth,
        description: description,
        mother_number: mother_number,
        pure_breed: pure_breed,
        male_female: male_female,
        sire_number: sire_number,
        tag_number: tag_number,
        animal_name: animal_name,
      },
    });

    const fromScreen = "Animal";

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

  const placeholderSex = {
    label: "Select a gender",
    value: null,
  };

  const placeholderPureBreed = {
    label: "Select Pure Breed",
    value: null,
  };

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();

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
            label="Add Animal"
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
            <Text style={styles.label}>Tag Number</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  autoFocus={true}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  placeholder="40122"
                  placeholderTextColor="#848D95"
                  onSubmitEditing={() => ref_input2.current.focus()}
                  blurOnSubmit={false}
                  maxLength={5}
                />
              )}
              name="tagNumber"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Sire Number</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  placeholder="10234"
                  placeholderTextColor="#848D95"
                  ref={ref_input2}
                  onSubmitEditing={() => ref_input3.current.focus()}
                  blurOnSubmit={false}
                  maxLength={5}
                />
              )}
              name="sireNumber"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Mother Number</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  placeholder="20455"
                  placeholderTextColor="#848D95"
                  ref={ref_input3}
                  maxLength={5}
                />
              )}
              name="motherNumber"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Sex</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <RNPickerSelect
                  items={[
                    { label: "Male", value: "M" },
                    { label: "Female", value: "F" },
                  ]}
                  onValueChange={(value) => onChange(value)}
                  style={styles.input}
                  onBlur={onBlur}
                  style={pickerSelectStyles}
                  placeholder={placeholderSex}
                />
              )}
              name="sex"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Breed</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="next"
                  placeholder="HBX"
                  placeholderTextColor="#848D95"
                  ref={ref_input4}
                  onSubmitEditing={() => ref_input5.current.focus()}
                  maxLength={3}
                  autoCapitalize="characters"
                />
              )}
              name="breed"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="next"
                  placeholder="2021-01-11"
                  placeholderTextColor="#848D95"
                  ref={ref_input5}
                />
              )}
              name="dateOfBirth"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Pure Breed</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <RNPickerSelect
                  items={[
                    { label: "True", value: true },
                    { label: "False", value: false },
                  ]}
                  onValueChange={(value) => onChange(value)}
                  style={styles.input}
                  onBlur={onBlur}
                  style={pickerSelectStyles}
                  placeholder={placeholderPureBreed}
                />
              )}
              name="pureBreed"
              rules={{ required: true }}
              defaultValue={null}
            />

            <Text style={styles.label}>Description</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  returnKeyType="done"
                />
              )}
              name="description"
              rules={{ required: true }}
              defaultValue={null}
              maxLength={50}
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
