/**
 * MainScreen
 * アプリのメイン画面
 */

import React, { useEffect, useMemo, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskList } from '../components/task';
import { TabList } from '../components/tab';
import { Snackbar } from '../components/common';
import { useAppContext } from '../contexts';
import { useSnackbar } from '../contexts/SnackbarContext';
import { DELETE_TAB_ID, SHADOW, SUCCESS_MESSAGES } from '../constants';

interface MainScreenProps {
  onNavigateToTabList?: () => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({ onNavigateToTabList }) => {
  const { taskList, tabList, appState } = useAppContext();
  const { showSnackbar, hideSnackbar, snackbarConfig, visible } = useSnackbar();

  // メモ化された値
  const isDeleteTab = useMemo(
    () => appState.state.activeTabId === DELETE_TAB_ID,
    [appState.state.activeTabId]
  );

  // 画面初期化
  useEffect(() => {
    const initialize = async () => {
      await tabList.initializeDefaultTabs();
      await tabList.fetchAllTabs();
    };

    initialize();
  }, []);

  // タブリストが読み込まれたら最初のタブをアクティブにする
  useEffect(() => {
    if (tabList.state.tabList.length > 0 && appState.state.activeTabId === 0) {
      const firstTab = tabList.state.tabList[0];
      appState.setActiveTabId(firstTab.id);
    }
  }, [tabList.state.tabList.length]);

  // タブ切り替え時にタスクを再取得
  useEffect(() => {
    if (appState.state.activeTabId !== 0) {
      taskList.fetchTasksByTabId(appState.state.activeTabId);
    }
  }, [appState.state.activeTabId]);

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

  // タスク完了トグル
  const handleToggleDone = useCallback(async (taskId: number) => {
    await taskList.toggleTaskDone(taskId, appState.state.activeTabId);
  }, [taskList, appState.state.activeTabId]);

  // タスク編集開始
  const handleStartEdit = useCallback((taskId: number) => {
    appState.setActiveEditId(taskId);
  }, [appState]);

  // タスク件名更新
  const handleUpdateSubject = useCallback(async (taskId: number, subject: string) => {
    await taskList.updateTaskSubject(taskId, subject);
  }, [taskList]);

  // タスク編集終了
  const handleEndEdit = useCallback(async () => {
    appState.exitEditMode();
    // 編集終了後にタスクリストを再取得
    await taskList.fetchTasksByTabId(appState.state.activeTabId);
  }, [appState, taskList]);

  // タスク削除
  const handleDeleteTask = useCallback(async (taskId: number) => {
    const originalTabId = appState.state.activeTabId;
    await taskList.softDeleteTask(taskId, originalTabId);

    showSnackbar({
      message: SUCCESS_MESSAGES.TASK_DELETED,
      action: {
        label: 'Undo',
        onPress: async () => {
          await taskList.undoSoftDelete(taskId, originalTabId, appState.state.activeTabId);
          hideSnackbar();
        },
      },
    });
  }, [taskList, appState, showSnackbar, hideSnackbar]);

  // タブ選択
  const handleTabPress = useCallback((tabId: number) => {
    appState.setActiveTabId(tabId);
  }, [appState]);

  // ローディング状態
  if (taskList.state.isLoading || tabList.state.isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-app-background">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#9C27B0" />
        </View>
      </SafeAreaView>
    );
  }

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
      <View className="flex-1 flex-row p-sm">
        {/* タスクリスト */}
        <View className="flex-1 mr-sm">
          <TaskList
            tasks={taskList.state.taskList}
            activeEditId={appState.state.activeEditId}
            onToggleDone={handleToggleDone}
            onStartEdit={handleStartEdit}
            onUpdateSubject={handleUpdateSubject}
            onEndEdit={handleEndEdit}
            onDelete={handleDeleteTask}
          />
        </View>

        {/* タブリスト */}
        <TabList
          tabs={tabList.state.tabList}
          activeTabId={appState.state.activeTabId}
          onTabPress={handleTabPress}
        />
      </View>

      {/* FAB */}
      <TouchableOpacity
        className="absolute bottom-5 left-1/2 -ml-7 w-14 h-14 rounded-full bg-blue-500 justify-center items-center"
        style={SHADOW.fab}
        onPress={isDeleteTab ? handleEmptyTrash : handleAddTask}
      >
        <Text className="text-3xl text-white">
          {isDeleteTab ? '🗑' : '+'}
        </Text>
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
