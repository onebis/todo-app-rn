import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppProvider } from './contexts';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { ErrorBoundary } from './components/common';
import "./../global.css";
// eslint-disable-next-line import/no-duplicates
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen, EditTabScreen, TabListScreen } from './screens';

export const unstable_settings = {
  anchor: '(tabs)',
};

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: string; title: string };
  Settings: undefined;
};

// const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ErrorBoundary> {/* エラーハンドリング */}
      <AppProvider> {/* アプリで使用するコンテクスト管理 */}
        <SnackbarProvider> {/* スナックバー（画面下に一時的に出る通知）を管理 */}
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
              {/*<Stack.Navigator*/}
              {/*    initialRouteName={"Home"}*/}
              {/*    screenOptions={{ headerShown: false}}*/}
              {/*>*/}
              {/*  <Stack.Screen name={"Home"} options={{ title: "ホーム"}} component={MainScreen} />*/}
              {/*</Stack.Navigator>*/}
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </SafeAreaProvider>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SnackbarProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
