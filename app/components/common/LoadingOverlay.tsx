/**
 * LoadingOverlay
 * ローディングオーバーレイコンポーネント
 */

import type React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = '読み込み中...',
}) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/50 justify-center items-center z-50">
      <View className="bg-white rounded-lg p-8 items-center">
        <ActivityIndicator size="large" color="#9C27B0" />
        <Text className="text-body-medium text-black mt-4">{message}</Text>
      </View>
    </View>
  );
};
