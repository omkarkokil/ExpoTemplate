import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAsync = async () => {
  await AsyncStorage.setItem("onborading", "onboard");
};

export const getAsync = async () => {
  const data = await AsyncStorage.getItem("onborading");
  return data;
};


