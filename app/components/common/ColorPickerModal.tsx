/**
 * ColorPickerModal
 * カラー選択モーダル
 */

import type React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { COLOR_LIST, type ColorType } from '../../constants/app';
import { ColorIndicator } from './ColorIndicator';
import { Modal } from './Modal';

interface ColorPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectColor: (color: ColorType) => void;
  selectedColor: ColorType;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  visible,
  onClose,
  onSelectColor,
  selectedColor,
}) => {
  const handleSelectColor = (color: ColorType) => {
    onSelectColor(color);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} title="カラーを選択">
      <FlatList
        data={COLOR_LIST}
        numColumns={6}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectColor(item)} className="w-1/6 p-2">
            <View
              className={`items-center p-2 rounded ${item === selectedColor ? 'bg-gray-200' : ''}`}
            >
              <ColorIndicator color={item} size={40} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </Modal>
  );
};
