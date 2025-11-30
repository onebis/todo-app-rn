/**
 * TaskList
 * タスクのリストを表示するコンポーネント
 */

import type React from 'react';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SUCCESS_MESSAGES } from '../../constants';
import { useAppContext } from '../../contexts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import type { TaskState } from '../../types';
import { TaskItem } from './TaskItem';

export const TaskList: React.FC = () => {
  const { taskList, appState } = useAppContext();
  const { showSnackbar, hideSnackbar } = useSnackbar();

  const tasks = taskList.state.taskList;
  const activeEditId = appState.state.activeEditId;

  // タスク完了トグル
  const handleToggleDone = useCallback(
    async (taskId: number) => {
      await taskList.toggleTaskDone(taskId, appState.state.activeTabId);
    },
    [taskList, appState.state.activeTabId]
  );

  // タスク編集開始
  const handleStartEdit = useCallback(
    (taskId: number) => {
      appState.setActiveEditId(taskId);
    },
    [appState]
  );

  // タスク件名更新
  const handleUpdateSubject = useCallback(
    async (taskId: number, subject: string) => {
      await taskList.updateTaskSubject(taskId, subject);
    },
    [taskList]
  );

  // タスク編集終了
  const handleEndEdit = useCallback(async () => {
    appState.exitEditMode();
    // 編集終了後にタスクリストを再取得
    await taskList.fetchTasksByTabId(appState.state.activeTabId);
  }, [appState, taskList]);

  // タスク削除
  const handleDeleteTask = useCallback(
    async (taskId: number) => {
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
    },
    [taskList, appState, showSnackbar, hideSnackbar]
  );

  const renderItem = useCallback(
    ({ item }: { item: TaskState }) => (
      <TaskItem
        task={item}
        isEditing={item.id === activeEditId}
        onToggleDone={handleToggleDone}
        onStartEdit={handleStartEdit}
        onUpdateSubject={handleUpdateSubject}
        onEndEdit={handleEndEdit}
        onDelete={handleDeleteTask}
      />
    ),
    [activeEditId, handleToggleDone, handleStartEdit, handleUpdateSubject, handleEndEdit, handleDeleteTask]
  );

  const keyExtractor = useCallback((item: TaskState) => item.id.toString(), []);

  if (tasks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-main-list-bg rounded-task-list">
        <Text className="text-body-large text-disabled">タスクがありません</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      removeClippedSubviews={false}
      maxToRenderPerBatch={10}
      windowSize={10}
      keyboardShouldPersistTaps="handled"
      className="flex-1 bg-main-list-bg rounded-task-list"
      contentContainerStyle={{ padding: 1, flexGrow: 1 }}
    />
  );
};
