import useAuthStore from "@/hooks/useAuthStore";
import React from "react";
import { View } from "react-native";
import {
  ArrowLeftStartOnRectangleIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const Navbar = () => {
  const { removeToken, token } = useAuthStore();
  return (
    <View>
      <SafeAreaView className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row gap-4 items-center">
          <Avatar.Icon
            size={40}
            color="white"
            className="bg-black"
            icon={CheckIcon}
          />
        </View>
        <View className="flex flex-row justify-between gap-4">
          <MagnifyingGlassIcon color={"black"} />
          <ShoppingCartIcon color={"black"} />
          <ArrowLeftStartOnRectangleIcon
            onPress={() => {
              removeToken();
              console.log(token);
            }}
            color={"black"}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Navbar;
