/**
 * TaskItem
 * 個別のタスクを表示・編集するコンポーネント
 */

import type React from 'react';
import { useEffect, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { TaskState } from '../../types';

import ScrollView = Animated.ScrollView;

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
    <View className="flex-row items-center p-sm bg-white border-b border-border-bottom">
      {/* チェックボックス */}
      <TouchableOpacity
        onPress={() => onToggleDone(task.id)}
        className="w-[30px] h-[30px] justify-center items-center mr-sm"
      >
        <Text className="text-2xl text-blue-500">{task.done ? '☑' : '☐'}</Text>
      </TouchableOpacity>

      {/* タスク件名 */}
      <View className="flex-1">
        {isEditing ? (
          <TextInput
            className="text-body-large text-black p-[5px]"
            style={{
              borderWidth: 0,
              outline: 'none',
            }}
            value={localSubject}
            onChangeText={handleSubjectChange}
            onSubmitEditing={handleSubmit}
            autoFocus
            placeholder="タスクを入力..."
            underlineColorAndroid="transparent"
          />
        ) : (
          <TouchableOpacity onPress={() => onStartEdit(task.id)} className="py-[5px]">
            <Text
              className={`text-body-large ${task.done ? 'text-task-done line-through' : 'text-black'}`}
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
        className="w-[30px] h-[30px] justify-center items-center ml-sm"
      >
        <Text className="text-xl">🗑</Text>
      </TouchableOpacity>
    </View>
  );
};
