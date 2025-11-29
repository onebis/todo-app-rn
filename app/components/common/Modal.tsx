/**
 * Modal
 * 共通モーダルコンポーネント
 */

import type React from 'react';
import { Pressable, Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, children, title }) => {
  return (
    <RNModal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
        <Pressable className="bg-white rounded-t-modal" onPress={(e) => e.stopPropagation()}>
          {/* ヘッダー */}
          <View className="h-16 justify-center items-center border-b border-border-bottom">
            {title && <Text className="text-lg font-medium text-black">{title}</Text>}
            <TouchableOpacity
              onPress={onClose}
              className="absolute right-4 w-10 h-10 justify-center items-center"
            >
              <Text className="text-2xl text-close-button">✕</Text>
            </TouchableOpacity>
          </View>

          {/* コンテンツ */}
          <View className="p-lg">{children}</View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};
