import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet } from "nativewind";
import { Provider } from "react-redux";
import { store } from "./store";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

// Import Fonts
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

//* Import Screens
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

const Stack = createNativeStackNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  const onLoaded = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Restaurant"
            component={RestaurantScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PreparingOrder"
            component={PreparingOrderScreen}
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function App() {
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: "gray",
//       }}>
//       <StatusBar style="light" />
//       <View style={styles.container}>
//         <Text>Open up App.js to start working... on your app</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   /* <StatusBar style="dark" /> */
// });
