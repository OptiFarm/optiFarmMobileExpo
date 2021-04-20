import React, { useState } from "react";

// COMPONENT
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { PageHeader } from "../../components/atoms/PageHeader";
import { MedicineUsageItemView } from "../../components/atoms/MedicineUsageItemView";
import SearchBarList from '../../components/molecules/SearchBar';

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

// QUERY
import { useQuery } from "@apollo/client";
import { GET_MEDICATION_USAGE_LIST } from "../../config/graphql/queries";

// THEME
import {
  SPACING,
  defaultBackground,
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

export default function MedicationUsage({ navigation }) {

  const [filteredData, setFilteredData] = useState([]);

  // MEDICINE USAGE LIST
  const { data, loading } = useQuery(GET_MEDICATION_USAGE_LIST);

  if (loading) {
    return <PageLoader />;
  }

  const MedicineUsageList =
    data.administeredMedications.administeredMedications;

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
            <SearchBarList items={MedicineUsageList} setFilteredData={setFilteredData} fromScreen='medicineusage'/>
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
