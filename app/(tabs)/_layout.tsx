import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Tabs } from 'expo-router';
import React from 'react';
import HomeScreen from '@/app/(tabs)/index';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { EditTabScreen, MainScreen, TabListScreen } from '../screens';

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: string; title: string };
  Settings: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Home'} options={{ title: 'ホーム' }} component={HomeScreen} />
    </Stack.Navigator>
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    //     }}
    //   />
    // </Tabs>
  );
}
