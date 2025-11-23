/**
 * MainScreen
 * アプリのメイン画面
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { TaskList } from '../components/task';
import { TabList } from '../components/tab';
import { useAppContext } from '../contexts';
import { DELETE_TAB_ID } from '../constants/app';

export const MainScreen: React.FC = () => {
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
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9C27B0" />
        </View>
      </SafeAreaView>
    );
  }

  const isDeleteTab = appState.state.activeTabId === DELETE_TAB_ID;

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo App</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* メインコンテンツ */}
      <View style={styles.content}>
        {/* タスクリスト */}
        <View style={styles.taskListContainer}>
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
        style={styles.fab}
        onPress={isDeleteTab ? handleEmptyTrash : handleAddTask}
      >
        <Text style={styles.fabIcon}>
          {isDeleteTab ? '🗑' : '+'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  taskListContainer: {
    flex: 1,
    marginRight: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
  },
});
