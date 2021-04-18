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

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: 'absolute',
    bottom: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4E5E9',
    padding: 30,
    width: width-25,
    borderRadius: 5,
    borderLeftColor: '#3E9141', 
    borderLeftWidth: 10,
  },
  modalText: {
    color: cardBackground, 
    fontSize: 18, 
    fontFamily: 'Sora-SemiBold',
  },
})

export default function HerdBook({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);

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

  // QUERY & MUTATION
  const { data: herdList, loading, refetch } = useQuery(GET_HERD);
  const [deleteAnimal, { data }] = useMutation(DELETE_ANIMAL);

  const onDelete = async (item) => {
    const _id = item._id;
    deleteAnimal({
      variables: {
        _id: _id,
      },
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  const AnimalList = herdList.herd.animals;

  const search = (searchText) => {
    setSearchText(searchText);

    let filteredData = AnimalList.filter(function (item) {
      return item.tag_number.toString().includes(searchText);
    });

    setFilteredData(filteredData);
  };

  const showModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      setModalVisible(false);
    }, 2500);
  };


  // HANDLE DELETE ANIMAL
  const handleDeleteAnimal = async (item) => {
    Alert.alert(
      "Delete Animal",
      "Are you sure you want to delete this Animal?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            async function deleteYes() {
              const deleting = await onDelete(item);
              refetch();
            }
            deleteYes();
            showModal();
          },
        },
      ]
    );
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
              label="My Herd"
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
                placeholder="Search Animal"
                keyboardType="decimal-pad"
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
        <View style={{ flexDirection: "row", paddingBottom: SPACING }}>
          <Button
            onPress={() =>
              navigation.navigate("Home", { screen: "AnimalForm" })
            }
            mode="contained"
            color="#E4E5E9"
            style={{
              marginHorizontal: SPACING,
              marginVertical: SPACING,
              borderRadius: 20,
            }}
            uppercase={false}
            labelStyle={{
              fontFamily: "Sora-SemiBold",
              fontSize: 15,
              color: cardBackground,
            }}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                size={24}
                color={cardBackground}
              />
            )}
          >
            Add Animal
          </Button>
        </View>
        <FlatList
          style={{ marginBottom: 30 }}
          showsVerticalScrollIndicator={true}
          data={
            filteredData && filteredData.length > 0 ? filteredData : AnimalList
          }
          keyExtractor={(item, index) => item._id}
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          renderItem={({ item }) => (
            <AnimalItemView
              item={item}
              navigation={navigation}
              onRightPress={() => {
                handleDeleteAnimal(item);
              }}
            />
          )}
        />
        <View style={modalStyles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={modalStyles.centeredView}>
              <View style={modalStyles.modalView}>
                <MaterialIcons name="check-circle" size={25} color='#3E9141' style={{marginRight: SPACING}} />
                <Text style={modalStyles.modalText}>Animal Deleted!</Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
}
