import { useColorScheme } from "@/components/useColorScheme";
import useAuthStore from "@/hooks/useAuthStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, setLoading] = useState(true); // State to manage loading state
  const { token } = useAuthStore();
  const segement = useSegments();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when component mounts

    return () => {
      setIsMounted(false); // Set isMounted to false when component unmounts
    };
  }, []);

  const router = useRouter();
  console.log(segement[0], token, "token");

  useEffect(() => {
    if (isMounted) {
      if (!token && segement[0] !== "(auth)") {
        router.replace("/(auth)/");
      }

      if (token && segement[0] === "(auth)") {
        router.replace("/home/");
      }
    }
    setLoading(false); // Set loading to false first
  }, [isMounted, segement, token, router]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || loading) {
    return (
      <View className="flex flex-1 items-center justify-center h-screen">
        <Text>Loading</Text>
      </View>
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <PaperProvider theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </PaperProvider>
  );
}

{
  /* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */
}
{
  /* <Stack>
<Stack.Screen name="(Auth)" options={{ headerShown: false }} />
<Stack.Screen name="tabs" options={{ headerShown: false }} />
<Stack.Screen name="home/index" options={{ headerShown: false }} />
<Stack.Screen name="test/onboard" options={{ headerShown: false }} />
</Stack> */
}
{
  /* </ThemeProvider> */
}
