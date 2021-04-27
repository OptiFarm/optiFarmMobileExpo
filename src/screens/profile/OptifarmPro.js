import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import faker from "faker";

// COMPONENT
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { PageHeader } from "../../components/atoms/PageHeader";

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

// THEME
import {
  SPACING,
  defaultBackground,
  cardBackground,
  topOS,
  height,
} from "../../config/theme";

// QUERY
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../config/graphql/queries";
import { ScrollView } from "react-native";

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
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
    color: "white",
    paddingLeft: SPACING,
  },
  subName: {
    fontSize: 15,
    fontFamily: "Sora-SemiBold",
    color: "white",
    opacity: 0.8,
    paddingLeft: SPACING,
    paddingTop: SPACING,
  },
  body: {
    fontSize: 22,
    fontFamily: "Sora-SemiBold",
    color: "white",
    paddingLeft: SPACING,
    textAlign: 'center',
    top: height / 5,
  }
});

export default function PersonalData({ navigation }) {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    errors,
  } = useForm();

  // USER INFO
  const { data, loading } = useQuery(GET_USER_INFO);

  if (loading) {
    return <PageLoader />;
  }
  const item = data.farmer.farmer;

  return (
    <>
        <SafeAreaView style={{ backgroundColor: defaultBackground }}>
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
                label="OptiFarm Pro"
                goBack={navigation.goBack}
                showChevron="true"
                />
            </View>
            </View>
        </SafeAreaView>
        <View style={{ backgroundColor: defaultBackground, flex: 1 }}>
            <Text style={styles.body}>Coming Soon</Text>
        </View>
    </>
  );
}
