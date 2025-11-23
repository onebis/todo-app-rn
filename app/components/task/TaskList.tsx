/**
 * TaskList
 * タスクのリストを表示するコンポーネント
 */

import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { TaskState } from '../../types';
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
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>タスクがありません</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          isEditing={item.id === activeEditId}
          onToggleDone={onToggleDone}
          onStartEdit={onStartEdit}
          onUpdateSubject={onUpdateSubject}
          onEndEdit={onEndEdit}
          onDelete={onDelete}
        />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#BDBDBD',
  },
});
