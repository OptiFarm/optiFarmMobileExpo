import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../components/context";

// COMPONENT
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { PageHeader } from "../../components/atoms/PageHeader";
import { Button } from "react-native-paper";

// THEME
import { SPACING, defaultBackground, cardBackground } from "../../config/theme";

// DATA
import ProfileData from "../../config/data/Profile";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../../config/graphql/queries";

// LOADER
import { PageLoader } from "../../components/atoms/PageLoader";

//CLEAN ASYNCSTORAGE
import { removeToken } from "../../config/config";

const styles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontFamily: "Sora-SemiBold",
    color: "white",
    paddingLeft: SPACING,
  },
  subName: {
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
    color: "white",
    opacity: 0.8,
    paddingLeft: SPACING,
    paddingTop: SPACING,
  },
  itemImage: {
    width: 25,
    height: 25,
  },
});

export default function ProfileScreen({ navigation }) {
  // USER INFO
  const { data, loading } = useQuery(GET_USER_INFO);

  if (loading) {
    return <PageLoader />;
  }
  
  let farmerInfo;
  let firstName;
  let lastName;
  let farmType;

  console.log(data)
  if (data.farmer.farmer !== null) {
    farmerInfo = data.farmer.farmer;
    firstName = farmerInfo.first_name;
    lastName = farmerInfo.second_name;
    farmType = farmerInfo.farm_type;
  }

  const { signOut } = React.useContext(AuthContext);
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: defaultBackground }}
      ></SafeAreaView>
      <View
        style={{
          backgroundColor: defaultBackground,
          flex: 1,
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <View
          style={{
            position: "absolute",
            padding: SPACING,
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={styles.name}>
              James Murphy
            </Text>
            <Text style={styles.subName}>{farmType.charAt(0) + farmType.slice(1).toLowerCase()} Farmer</Text>
          </View>
        </View>

        <FlatList
          scrollEnabled={false}
          style={{ padding: SPACING, top: 80 }}
          data={ProfileData}
          keyExtractor={(item) => item.key}
          decelerationRate="fast"
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", {
                    screen: `${item.navigation}`,
                  })
                }
                style={{
                  flexDirection: "row",
                  paddingTop: 40,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: `${item.backgroundColor}`,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "Sora-SemiBold",
                    fontSize: 18,
                    color: "white",
                    paddingLeft: SPACING,
                  }}
                >
                  {item.type}
                </Text>
                <Feather
                  name="chevron-right"
                  size={25}
                  color="white"
                  style={{ position: "absolute", right: 0, bottom: SPACING }}
                />
              </TouchableOpacity>
            );
          }}
        />
        <View>
          <Button
            onPress={() => {
              signOut();
              removeToken();
            }}
            contentStyle={{ height: 50, width: 20 }}
            mode="contained"
            color="#F4F3BE"
            style={{
              bottom: 20,
              borderRadius: 10,
              width: 350,
              alignSelf: "center",
            }}
            contentStyle={{ height: 50 }}
            labelStyle={{
              fontFamily: "Sora-Bold",
              fontSize: 17,
              color: cardBackground,
            }}
          >
            Logout
          </Button>
        </View>
      </View>
    </>
  );
}
