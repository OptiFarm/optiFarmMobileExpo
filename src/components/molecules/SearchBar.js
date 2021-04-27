import React, { useState, useRef, useEffect } from "react";
import { MaterialCommunityIcons, MaterialIcons, Feather } from "@expo/vector-icons";

// COMPONENTS
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Alert,
  Modal,
  Pressable,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import { PageHeader } from "../../components/atoms/PageHeader";
import { AnimalItemView } from "../../components/atoms/AnimalItemView";
import { SearchBar } from "react-native-elements";

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

// QUERY
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_HERD } from "../../config/graphql/queries";
import { DELETE_ANIMAL } from "../../config/graphql/mutation";

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

export default function SearchBarList ({ items, setFilteredData, setSearchText, searchText, fromScreen }) {

    // ANIMATION
    const { Value, timing } = Animated;
    const [isFocused, setIsFocused] = useState(true);
    const ref_input = useRef();

    const input_box_translate_x = useRef(new Value(width)).current;
    const back_button_opacity = useRef(new Value(0)).current;
    
    // PLACEHOLDER
    const placeholder = fromScreen === 'herdbook' ? 'Search Animal' : fromScreen === 'medicine' ? 'Search Medicine' : 'Search Medicine Usage';

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

    const search = (searchText) => {
        setSearchText(searchText);
    
        let filteredData = items.filter(function (item) {

            if (fromScreen === 'herdbook') {
                const tag_number_search = item.tag_number.toString().includes(searchText);
                const breed_type_search = item.breed_type.includes(
                    searchText.toUpperCase()
                );
                const sex_search = item.male_female.includes(
                    searchText.charAt(0)
                );
            
                return tag_number_search || breed_type_search || sex_search;
            }
            else if (fromScreen === 'medicine') {
                const medicine_name_search = item.medication_name.toLowerCase().includes(searchText.toLowerCase());
                const medicine_type = item.medicine_type.includes(
                  searchText.toUpperCase()
                );
                
                return medicine_name_search || medicine_type;
            } else {
                const animal_tag_search = item.animal[0].tag_number.toString().includes(searchText);
                const medicine_name_search = item.medication[0].medication_name.toLowerCase().includes(searchText.toLowerCase());
          
                return animal_tag_search || medicine_name_search;
            }
        });
    
        setFilteredData(filteredData);
    };

    return (
        <>
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
                    placeholder={placeholder}
                    returnKeyType="search"
                    ref={ref_input}
                    value={searchText}
                    onChangeText={search}
                    onClear={onBlur}
                    onSubmitEditing={onBlur}
                />
            </Animated.View>
        </>
    )
}