import { setAsync } from "@/utils/Store";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import Onboarding from "react-native-onboarding-swiper";

const onboard = () => {
  return (
    <Onboarding
      onDone={() => {
        setAsync();
        router.navigate("(home)/index");
      }}
      pages={[
        {
          backgroundColor: "#FFFFFF",
          image: (
            <LottieView
              style={{ height: 400, width: 400 }}
              source={require("../../assets/images/AnimationLottie.json")}
              autoPlay
              loop
            />
          ),
          title: "Fast delivery and support",
          subtitle: "This is the subtitle that sumplements the title.",
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <LottieView
              style={{ height: 400, width: 400 }}
              source={require("../../assets/images/Buy.json")}
              autoPlay
              loop
            />
          ),
          title: "Easy Buy and tons of feature",
          subtitle: "This is the subtitle that sumplements the title.",
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <LottieView
              style={{ height: 400, width: 400 }}
              source={require("../../assets/images/products.json")}
              autoPlay
              loop
            />
          ),
          title: "Variety of prodcuts",
          subtitle: "This is the subtitle that sumplements the title.",
        },
      ]}
    />
  );
};

export default onboard;
