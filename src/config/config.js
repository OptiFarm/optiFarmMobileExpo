import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("@user_token", value);
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@user_token");
    return token != null ? token : null;
  } catch (e) {
    console.log(e);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@user_token");
  } catch (e) {
    console.log(e); // clear error
  }
};
