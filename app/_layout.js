import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";


// 防止隐藏启动画面
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // 加载字体
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLaout = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  // 字体加载前阻止渲染
  if (!fontsLoaded) {
    return null;
  }

  return <Stack onLaout={onLaout} />;
}