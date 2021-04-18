import React, { useState, useRef, useEffect } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// COMPONENT
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import { PageHeader } from "../../components/atoms/PageHeader";
import { MedicineUsageItemView } from "../../components/atoms/MedicineUsageItemView";
import { SearchBar } from "react-native-elements";

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

// QUERY
import { useQuery } from "@apollo/client";
import { GET_MEDICATION_USAGE_LIST } from "../../config/graphql/queries";

// ANIMATION
import Animated, { EasingNode } from "react-native-reanimated";

// THEME
import {
  SPACING,
  defaultBackground,
  cardBackground,
  width,
  height,
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
  search_icon_box: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#E4E5E9",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  input_box: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    width: width - 20,
  },
  back_icon_box: {
    width: 50,
    height: 50,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    backgroundColor: defaultBackground,
  },
  input: {
    backgroundColor: defaultBackground,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: width - 60,
    position: "absolute",
    right: 0,
  },
});

export default function MedicationUsage({ navigation }) {
  // ANIMATION
  const { Value, timing } = Animated;
  const [isFocused, setIsFocused] = useState(true);
  const ref_input = useRef();

  const input_box_translate_x = useRef(new Value(width)).current;
  const back_button_opacity = useRef(new Value(0)).current;

  // SEARCH
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const onFocus = () => {
    setIsFocused(true);

    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    // RUN ANIMATION
    timing(input_box_translate_x, input_box_translate_x_config).start();
    timing(back_button_opacity, back_button_opacity_config).start();

    ref_input.current.focus();
  };

  const onBlur = () => {
    setIsFocused(true);

    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: EasingNode.inOut(EasingNode.ease),
    };

    // RUN ANIMATION
    timing(input_box_translate_x, input_box_translate_x_config).start();
    timing(back_button_opacity, back_button_opacity_config).start();

    ref_input.current.blur();
  };

  // MEDICINE USAGE LIST
  const { data, loading } = useQuery(GET_MEDICATION_USAGE_LIST);

  if (loading) {
    return <PageLoader />;
  }

  const MedicineUsageList =
    data.administeredMedications.administeredMedications;

  const search = (searchText) => {
    setSearchText(searchText);

    let filteredData = MedicineUsageList.filter(function (item) {
      console.log(item)
      const animal_tag_search = item.animal[0].tag_number.toString().includes(searchText);
      const medicine_name_search = item.medication[0].medication_name.includes(searchText);

      return animal_tag_search || medicine_name_search;
    });

    setFilteredData(filteredData);
  };

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
              label="Medicine Usage"
              goBack={navigation.goBack}
              showChevron="true"
            />

            <TouchableHighlight
              activeOpacity={1}
              underlayColor={"#ccd0d5"}
              onPress={onFocus}
              style={styles.search_icon_box}
            >
              <MaterialIcons name="search" size={30} color={cardBackground} />
            </TouchableHighlight>

            <Animated.View
              style={[
                styles.input_box,
                { transform: [{ translateX: input_box_translate_x }] },
              ]}
            >
              <Animated.View style={{ opacity: back_button_opacity }}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={"#ccd0d5"}
                  onPress={onBlur}
                  style={styles.back_icon_box}
                >
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={30}
                    color="white"
                  />
                </TouchableHighlight>
              </Animated.View>
              <SearchBar
                containerStyle={styles.input}
                inputContainerStyle={{ backgroundColor: "#E4E5E9" }}
                inputStyle={{
                  color: cardBackground,
                  fontFamily: "Sora-SemiBold",
                }}
                round
                searchIcon={null}
                clearIcon={true}
                placeholder="Search Medicine Usage"
                returnKeyType="done"
                ref={ref_input}
                value={searchText}
                maxLength={5}
                onChangeText={search}
                onClear={onBlur}
                onSubmitEditing={onBlur}
              />
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
      <View style={{ backgroundColor: defaultBackground, flex: 1 }}>
        <FlatList
          style={{ marginTop: SPACING }}
          showsVerticalScrollIndicator={true}
          data={
            filteredData && filteredData.length > 0
              ? filteredData
              : MedicineUsageList
          }
          keyExtractor={(item, index) => item._id}
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          renderItem={({ item }) => (
            <MedicineUsageItemView item={item} navigation={navigation} />
          )}
        />
      </View>
    </>
  );
}
