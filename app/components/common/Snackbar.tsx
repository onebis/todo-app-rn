/**
 * Snackbar
 * 通知メッセージ表示コンポーネント
 */

import React, { useEffect } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

interface SnackbarProps {
  visible: boolean;
  message: string;
  duration?: number;
  onDismiss: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  duration = 3000,
  onDismiss,
  action,
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [visible]);

  const handleDismiss = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={{ opacity }}
      className="absolute bottom-20 left-4 right-4 bg-gray-800 rounded-lg p-4 flex-row items-center justify-between"
    >
      <Text className="text-white text-body-medium flex-1">{message}</Text>
      {action && (
        <TouchableOpacity onPress={action.onPress} className="ml-4">
          <Text className="text-blue-400 font-medium">{action.label}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};
