/**
 * MainScreen
 * アプリのメイン画面
 */

import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { TaskList } from '../components/task';
import { TabList } from '../components/tab';
import { useAppContext } from '../contexts';
import { DELETE_TAB_ID, SHADOW } from '../constants';

interface MainScreenProps {
  onNavigateToTabList?: () => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({ onNavigateToTabList }) => {
  const { taskList, tabList, appState } = useAppContext();

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
  const handleAddTask = async () => {
    try {
      const newTaskId = await taskList.createTask(appState.state.activeTabId);
      appState.setActiveEditId(newTaskId);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // ゴミ箱を空にする
  const handleEmptyTrash = async () => {
    await taskList.deleteAllTasksInTrash();
  };

  // タスク完了トグル
  const handleToggleDone = async (taskId: number) => {
    await taskList.toggleTaskDone(taskId, appState.state.activeTabId);
  };

  // タスク編集開始
  const handleStartEdit = (taskId: number) => {
    appState.setActiveEditId(taskId);
  };

  // タスク件名更新
  const handleUpdateSubject = async (taskId: number, subject: string) => {
    await taskList.updateTaskSubject(taskId, subject);
  };

  // タスク編集終了
  const handleEndEdit = async () => {
    appState.exitEditMode();
    // 編集終了後にタスクリストを再取得
    await taskList.fetchTasksByTabId(appState.state.activeTabId);
  };

  // タスク削除
  const handleDeleteTask = async (taskId: number) => {
    await taskList.softDeleteTask(taskId, appState.state.activeTabId);
  };

  // タブ選択
  const handleTabPress = (tabId: number) => {
    appState.setActiveTabId(tabId);
  };

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

  const isDeleteTab = appState.state.activeTabId === DELETE_TAB_ID;

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
    </SafeAreaView>
  );
};
