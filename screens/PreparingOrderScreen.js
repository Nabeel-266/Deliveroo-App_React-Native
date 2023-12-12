import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

const PreparingOrderScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 5000);
  }, []);

  return (
    <SafeAreaView className="bg-[#01ccbd] flex flex-1 items-center justify-center gap-5">
      <Animatable.Image
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="w-[360px] h-[360px]"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-[15px] text-white text-center"
        style={{ fontFamily: "Quicksand_600SemiBold" }}>
        Waiting for restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle
        size={60}
        color="white"
        borderWidth={4}
        endAngle={0.8}
        indeterminate={true}
        collapsable={false}
      />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
