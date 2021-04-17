import React, { useEffect } from "react";
import { useScrollToTop } from "@react-navigation/native";

// COMPONENTS
import {
  ScrollView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MainCards } from "../../components/molecules/MainCards";
import { PageHeader } from "../../components/atoms/PageHeader";
import { MedicineItemView } from "../../components/atoms/MedicineItemView";

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

// QUERY
import { useQuery } from "@apollo/client";
import {
  GET_ANIMAL_COUNT,
  GET_HOMEPAGE_MEDICNE,
  GET_TEST_INFO,
} from "../../config/graphql/queries";

// THEME
import {
  defaultBackground,
  SPACING,
  CELL_HEIGHT,
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

export default function HomeScreen({ navigation }) {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  let HomepageMedicineList = [];
  // MEDICINE LIST
  const { data, loading, refetch } = useQuery(GET_HOMEPAGE_MEDICNE);
  const {
    data: animalCountData,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(GET_ANIMAL_COUNT);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (refetch || refetchCount) {
        refetch();
        refetchCount();
      }
    });
    return unsubscribe;
  }, [navigation]);

  if (loading || loadingCount) {
    return <PageLoader />;
  }

  if (typeof data !== undefined) {
    if (data.medicationsLastThreeUsed.medications !== null)
      data.medicationsLastThreeUsed.medications.forEach((medication) => {
        if (medication._id !== null) {
          HomepageMedicineList.push(medication);
        }
      });
  }

  const animalCount =
    animalCountData.herdCount.count === null
      ? 0
      : animalCountData.herdCount.count;

  const renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: SPACING }}>
      <MedicineItemView item={item} navigation={navigation} />
    </View>
  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: defaultBackground }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SPACING,
            marginBottom: 30,
          }}
        >
          <View style={styles.header_inner}>
            <PageHeader
              label="Home"
              goBack={navigation.goBack}
              showChevron="false"
            />
          </View>
        </View>
      </SafeAreaView>
      <View style={{ backgroundColor: defaultBackground, flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              <MainCards navigation={navigation} animalCount={animalCount} />
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "Sora-Bold",
                    top: CELL_HEIGHT / 10,
                    color: "white",
                    padding: SPACING,
                  }}
                >
                  Last Medicine Used
                </Text>
                <TouchableOpacity
                  style={{ position: "absolute", right: 10 }}
                  onPress={() => navigation.navigate("MedicineTab")}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: CELL_HEIGHT * 0.55,
                      fontFamily: "Sora-Bold",
                      color: "#F4F3BE",
                    }}
                  >
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          data={HomepageMedicineList}
          keyExtractor={(item, index) => item._id}
          renderItem={renderItem}
          ref={ref}
        />
      </View>
    </>
  );
}
