import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { RootStackParamList } from '@/app/_layout';
import { EditTabScreen } from '@/screens/EditTabScreen';
import { MainScreen } from '@/screens/MainScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Home'} options={{ title: 'ホーム' }} component={MainScreen} />
        <Stack.Screen name={'Settings'} options={{ title: '設定' }} component={EditTabScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
