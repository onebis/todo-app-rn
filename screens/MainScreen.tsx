/**
 * MainScreen
 * アプリのメイン画面
 */

import { useNavigation } from '@react-navigation/native';
import type React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Snackbar } from '@/app/components/common';
import { TabList } from '@/app/components/tab';
import { TaskList } from '@/app/components/task';
import { DELETE_TAB_ID, SHADOW } from '@/app/constants';
import { useAppContext } from '@/app/contexts';
import { useSnackbar } from '@/app/contexts/SnackbarContext';

// interface MainScreenProps {
//   onNavigateToTabList?: () => void;
// }

export const MainScreen: React.FC = () => {
  const navigation = useNavigation();
  const onNavigateToTabList = () => {
    navigation.navigate('Settings' as never);
  };
  const { taskList, tabList, appState } = useAppContext();
  const { hideSnackbar, snackbarConfig, visible } = useSnackbar();

  // メモ化された値
  const isDeleteTab = useMemo(
    () => appState.state.activeTabId === DELETE_TAB_ID,
    [appState.state.activeTabId]
  );

  // 画面初期化
  // biome-ignore lint/correctness/useExhaustiveDependencies: <初期化時のみ実行したいため>
  useEffect(() => {
    const initialize = async () => {
      await tabList.initializeDefaultTabs();
      await tabList.fetchAllTabs();
    };

    initialize();
  }, []);

  // タブリストが読み込まれたら最初のタブをアクティブにする
  useEffect(() => {
    if (tabList.state.tabList.length > 0) {
      const firstTab = tabList.state.tabList[0];
      appState.setActiveTabId(firstTab.id);
    } else {
      appState.setActiveTabId(0);
    }
  }, [tabList.state.tabList.length]);

  // タブ切り替え時にタスクを再取得
  useEffect(() => {
    taskList.fetchTasksByTabId(appState.state.activeTabId);
  }, [appState.state.activeTabId, taskList.fetchTasksByTabId]);

  // タスク追加
  const handleAddTask = useCallback(async () => {
    try {
      const newTaskId = await taskList.createTask(appState.state.activeTabId);
      appState.setActiveEditId(newTaskId);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }, [taskList, appState]);

  // ゴミ箱を空にする
  const handleEmptyTrash = useCallback(async () => {
    await taskList.deleteAllTasksInTrash();
  }, [taskList]);

  // タブ選択
  const handleTabPress = useCallback(
    (tabId: number) => {
      appState.setActiveTabId(tabId);
    },
    [appState]
  );

  // ローディング状態 TODO: ローディング時にはスケルトンスクリーンや操作できない仕組みを実装する
  // if (taskList.state.isLoading || tabList.state.isLoading) {
  //   return (
  //     <SafeAreaView className="flex-1 bg-app-background">
  //       <View className="flex-1 justify-center items-center">
  //         <ActivityIndicator size="large" color="#9C27B0" />
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      {/* ヘッダー */}
      <View className="h-[60px] flex-row justify-between items-center px-md bg-white">
        <Text className="text-xl font-bold text-black">Todo App</Text>
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center"
          onPress={onNavigateToTabList}
        >
          <Text className="text-2xl">⚙</Text>
        </TouchableOpacity>
      </View>

      {/* メインコンテンツ */}
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        className="flex-1"
      >
        <View className="flex-1 flex-row p-sm">
          {/* タスクリスト */}
          <View className="flex-1">
            <TaskList />
          </View>

          {/* タブリスト */}
          <TabList
            tabs={tabList.state.tabList}
            activeTabId={appState.state.activeTabId}
            onTabPress={handleTabPress}
          />
        </View>
      </KeyboardAvoidingView>

      {/* FAB */}
      <TouchableOpacity
        className="absolute bottom-5 left-1/2 -ml-7 w-14 h-14 rounded-full bg-blue-500 justify-center items-center"
        style={SHADOW.fab}
        onPress={isDeleteTab ? handleEmptyTrash : handleAddTask}
      >
        <Text className="text-3xl text-white">{isDeleteTab ? '🗑' : '+'}</Text>
      </TouchableOpacity>

      {/* Snackbar */}
      <Snackbar
        visible={visible}
        message={snackbarConfig?.message || ''}
        duration={snackbarConfig?.duration}
        onDismiss={hideSnackbar}
        action={snackbarConfig?.action}
      />
    </SafeAreaView>
  );
};
