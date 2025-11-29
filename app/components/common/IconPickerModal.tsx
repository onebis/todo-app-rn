/**
 * IconPickerModal
 * アイコン選択モーダル
 */

import type React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ICON_LIST, type IconType } from '../../constants/app';
import { IconComponent } from './IconComponent';
import { Modal } from './Modal';

interface IconPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectIcon: (icon: IconType) => void;
  selectedIcon: IconType;
}

export const IconPickerModal: React.FC<IconPickerModalProps> = ({
  visible,
  onClose,
  onSelectIcon,
  selectedIcon,
}) => {
  const handleSelectIcon = (icon: IconType) => {
    onSelectIcon(icon);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} title="アイコンを選択">
      <FlatList
        data={ICON_LIST}
        numColumns={6}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectIcon(item)} className="w-1/6 p-2">
            <View
              className={`items-center p-2 rounded ${item === selectedIcon ? 'bg-gray-200' : ''}`}
            >
              <IconComponent icon={item} size={40} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </Modal>
  );
};
