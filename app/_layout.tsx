import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ErrorBoundary } from './components/common';
import { AppProvider } from './contexts';
import { SnackbarProvider } from './contexts/SnackbarContext';
import './../global.css';
import { Stack } from 'expo-router';

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: string; title: string };
  Settings: undefined;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ErrorBoundary>
      {' '}
      {/* エラーハンドリング */}
      <AppProvider>
        {' '}
        {/* アプリで使用するコンテクスト管理 */}
        <SnackbarProvider>
          {' '}
          {/* スナックバー（画面下に一時的に出る通知）を管理 */}
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SnackbarProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
