/**
 * TaskList
 * タスクのリストを表示するコンポーネント
 */

import type React from 'react';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import type { TaskState } from '../../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: TaskState[];
  activeEditId: number;
  onToggleDone: (taskId: number) => void;
  onStartEdit: (taskId: number) => void;
  onUpdateSubject: (taskId: number, subject: string) => void;
  onEndEdit: () => void;
  onDelete: (taskId: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  activeEditId,
  onToggleDone,
  onStartEdit,
  onUpdateSubject,
  onEndEdit,
  onDelete,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: TaskState }) => (
      <TaskItem
        task={item}
        isEditing={item.id === activeEditId}
        onToggleDone={onToggleDone}
        onStartEdit={onStartEdit}
        onUpdateSubject={onUpdateSubject}
        onEndEdit={onEndEdit}
        onDelete={onDelete}
      />
    ),
    [activeEditId, onToggleDone, onStartEdit, onUpdateSubject, onEndEdit, onDelete]
  );

  const keyExtractor = useCallback((item: TaskState) => item.id.toString(), []);

  if (tasks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-amber-300 rounded-task-list">
        <Text className="text-body-large text-disabled">タスクがありません</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      className="flex-1 bg-main-list-bg opacity-70 rounded-task-list"
    />
  );
};
