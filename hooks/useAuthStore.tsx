import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

type authProps = {
  token: string | null;
  setToken: (value: string) => void;
  getToken: (key: string) => void;
  removeToken: () => void;
};

const useAuthStore = create<authProps>((set) => ({
  token: "",
  setToken: async (value) => {
    try {
      await SecureStore.setItemAsync("authToken", value);
    } catch (error) {
      console.log(error, "Error from the token store");
    }
  },
  getToken: async (key: string) => {
    try {
      const token = await SecureStore.getItemAsync(key);
      if (token !== null) {
        set({ token });
      }
      return token;
    } catch (error) {
      console.log(error, "Error from the token store getToken");
    }
  },
  removeToken: async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      set({ token: null });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },
}));

export default useAuthStore;
