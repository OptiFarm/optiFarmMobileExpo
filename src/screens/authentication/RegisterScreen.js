import React, { useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useForm, Controller } from "react-hook-form";

import { AuthContext } from "../../components/context";

// COMPONENTS
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

// DATA
import { RegisterFormData } from "../../model/Users";

// APOLLO REACT HOOK & QUERY
import { from, useMutation } from "@apollo/client";
import { SIGN_UP } from "../../config/graphql/mutation";

import { storeToken } from "../../config/config";

// THEME
import { cardBackground, SPACING } from "../../config/theme";
import { Alert } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
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
  label: {
    color: cardBackground,
    marginBottom: 10,
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    opacity: 0.8,
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderColor: cardBackground,
    backgroundColor: "#F6F6F6",
    borderWidth: 0.5,
    fontFamily: "Sora-SemiBold",
    fontSize: 20,
    color: cardBackground,
    marginBottom: 30,
    paddingLeft: SPACING,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 0.5,
    borderColor: cardBackground,
    borderRadius: 10,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: cardBackground,
    paddingRight: 30,
    backgroundColor: "#F6F6F6",
    height: 50,
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    marginBottom: 30,
  },
  inputAndroid: {
    borderWidth: 0.5,
    borderColor: cardBackground,
    borderRadius: 10,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: cardBackground,
    paddingRight: 30,
    backgroundColor: "#F6F6F6",
    height: 50,
    fontFamily: "Sora-SemiBold",
    fontSize: 18,
    marginBottom: 30,
  },
});

export default function RegisterScreen({ navigation }) {
  const { signUp } = React.useContext(AuthContext);

  // USE QUERY
  const [userInfo, { error }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      if (!data.signUp.responseCheck.success) {
        Alert.alert("Unable to SignUp", data.signUp.responseCheck.message);
      } else {
        signUp(data.signUp.token);
      }
    },
  });
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
    const email = data.email;
    const password = data.password;
    const first_name = data.first_name;
    const second_name = data.second_name;
    const farm_type = data.farmType;
    const herd_number = data.herdNumber;
    const farm_address = data.address;
    userInfo({
      variables: {
        email: email,
        password: password,
        first_name: first_name,
        second_name: second_name,
        farm_type: farm_type,
        farm_address: farm_address,
        herd_number: herd_number,
      },
    });
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const placeholder = {
    label: "Select Farm Type",
    value: null,
  };

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();

  return (
    <>
      <View style={styles.background}>
        <View style={[styles.navBar, { marginTop: getStatusBarHeight() }]}>
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={navigation.goBack}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={30}
              color={cardBackground}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Sora-Bold",
              fontSize: 30,
              color: cardBackground,
              right: 0,
            }}
          >
            Create Account
          </Text>
          <Text style={styles.rightContainer}></Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={RegisterFormData}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{ padding: SPACING }}
            renderItem={({ item }) => {
              return (
                <>
                  <Text style={styles.label}>{item.firstName}</Text>
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
                        placeholderTextColor="#848D95"
                        onSubmitEditing={() => ref_input2.current.focus()}
                        blurOnSubmit={false}
                      />
                    )}
                    name="first_name"
                    rules={{ required: true }}
                    defaultValue={null}
                  />
                  <Text style={styles.label}>{item.surName}</Text>
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
                        placeholderTextColor="#848D95"
                        onSubmitEditing={() => ref_input2.current.focus()}
                        blurOnSubmit={false}
                      />
                    )}
                    name="second_name"
                    rules={{ required: true }}
                    defaultValue={null}
                  />

                  <Text style={styles.label}>{item.email}</Text>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        returnKeyType="next"
                        ref={ref_input2}
                        onSubmitEditing={() => ref_input3.current.focus()}
                        blurOnSubmit={false}
                      />
                    )}
                    name="email"
                    rules={{ required: true }}
                    defaultValue={null}
                  />

                  <Text style={styles.label}>{item.farmType}</Text>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <RNPickerSelect
                        items={[
                          { label: "Dairy", value: "DAIRY" },
                          { label: "Beef", value: "BEEF" },
                          { label: "Suckler", value: "SUCKLER" },
                          { label: "Other", value: "OTHER" },
                        ]}
                        onValueChange={(value) => onChange(value)}
                        style={styles.input}
                        onBlur={onBlur}
                        style={pickerSelectStyles}
                        placeholder={placeholder}
                      />
                    )}
                    name="farmType"
                    rules={{ required: true }}
                    defaultValue={null}
                  />

                  <Text style={styles.label}>{item.herdNumber}</Text>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        returnKeyType="next"
                        ref={ref_input3}
                        onSubmitEditing={() => ref_input4.current.focus()}
                      />
                    )}
                    name="herdNumber"
                    rules={{ required: true }}
                    defaultValue={null}
                  />

                  <Text style={styles.label}>{item.address}</Text>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        returnKeyType="next"
                        ref={ref_input5}
                        onSubmitEditing={() => ref_input6.current.focus()}
                      />
                    )}
                    name="address"
                    rules={{ required: false }}
                    defaultValue={null}
                  />

                  <Text style={styles.label}>{item.password}</Text>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        returnKeyType="done"
                        ref={ref_input6}
                        secureTextEntry
                      />
                    )}
                    name="password"
                    rules={{ required: true }}
                    defaultValue={null}
                  />

                  <Button
                    contentStyle={{ height: 50, width: 25 }}
                    mode="contained"
                    color={cardBackground}
                    style={{ marginVertical: 10, borderRadius: 10 }}
                    contentStyle={{ height: 50 }}
                    labelStyle={{
                      fontFamily: "Sora-Bold",
                      fontSize: 17,
                      color: "white",
                    }}
                    onPress={handleSubmit(onSubmit)}
                  >
                    Sign Up
                  </Button>
                </>
              );
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
