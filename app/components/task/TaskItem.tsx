/**
 * TaskItem
 * 個別のタスクを表示・編集するコンポーネント
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { TaskState } from '../../types';

interface TaskItemProps {
  task: TaskState;
  isEditing: boolean;
  onToggleDone: (taskId: number) => void;
  onStartEdit: (taskId: number) => void;
  onUpdateSubject: (taskId: number, subject: string) => void;
  onEndEdit: () => void;
  onDelete: (taskId: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isEditing,
  onToggleDone,
  onStartEdit,
  onUpdateSubject,
  onEndEdit,
  onDelete,
}) => {
  const [localSubject, setLocalSubject] = useState(task.subject);

  // task.subject が変更されたら localSubject を同期
  useEffect(() => {
    setLocalSubject(task.subject);
  }, [task.subject]);

  const handleSubjectChange = (text: string) => {
    setLocalSubject(text);
    onUpdateSubject(task.id, text);
  };

  const handleSubmit = () => {
    onEndEdit();
  };

  return (
    <View style={styles.container}>
      {/* チェックボックス */}
      <TouchableOpacity
        onPress={() => onToggleDone(task.id)}
        style={styles.checkbox}
      >
        <Text style={styles.checkboxIcon}>
          {task.done ? '☑' : '☐'}
        </Text>
      </TouchableOpacity>

      {/* タスク件名 */}
      <View style={styles.contentContainer}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={localSubject}
            onChangeText={handleSubjectChange}
            onSubmitEditing={handleSubmit}
            autoFocus
            placeholder="タスクを入力..."
          />
        ) : (
          <TouchableOpacity
            onPress={() => onStartEdit(task.id)}
            style={styles.textContainer}
          >
            <Text
              style={[
                styles.text,
                task.done && styles.textDone,
              ]}
              numberOfLines={1}
            >
              {task.subject || '(空のタスク)'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 削除ボタン（スワイプ代替） */}
      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteIcon}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  checkbox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxIcon: {
    fontSize: 24,
    color: '#2196F3',
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
  textDone: {
    color: '#757575',
    textDecorationLine: 'line-through',
  },
  input: {
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 4,
    padding: 5,
  },
  deleteButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteIcon: {
    fontSize: 20,
  },
});
