import React, { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// COMPONENTS
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Alert,
  Modal,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import { PageHeader } from "../../components/atoms/PageHeader";
import { AnimalItemView } from "../../components/atoms/AnimalItemView";
import SearchBarList from '../../components/molecules/SearchBar';

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

// QUERY
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_HERD } from "../../config/graphql/queries";
import { DELETE_ANIMAL } from "../../config/graphql/mutation";

// THEME
import {
  SPACING,
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
  const [filteredData, setFilteredData] = useState([]);

  const showModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  // GET HERD LIST
  const { data: herdList, loading, refetch } = useQuery(GET_HERD);

  // DELETE ANIMAL
  const [deleteAnimal, { data }] = useMutation(DELETE_ANIMAL, {
    onCompleted(data) {
      if (data.deleteAnimal.responseCheck.success) {
        refetch();
        showModal();
      } else {
        const message = data.deleteAnimal.responseCheck.message;
        Alert.alert("Unable to Delete Animal", message);
      }
    }
  });

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
            }
            deleteYes();
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
            <SearchBarList items={AnimalList} setFilteredData={setFilteredData} fromScreen='herdbook'/>
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
