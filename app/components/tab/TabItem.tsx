/**
 * TabItem
 * 個別のタブを表示するコンポーネント
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { TabState } from '../../types';
import { IconComponent, ColorIndicator } from '../common';

interface TabItemProps {
  tab: TabState;
  isActive: boolean;
  onPress: (tabId: number) => void;
}

export const TabItem: React.FC<TabItemProps> = ({
  tab,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(tab.id)}
      style={[
        styles.container,
        isActive && styles.containerActive,
      ]}
    >
      <View style={styles.content}>
        {/* カラーインジケーター */}
        <ColorIndicator color={tab.color as any} size={12} />

        {/* タブ名 */}
        <Text style={styles.title} numberOfLines={1}>
          {tab.title}
        </Text>

        {/* アイコン */}
        <IconComponent icon={tab.icon as any} size={16} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#BDBDBD',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
  containerActive: {
    backgroundColor: '#F2F2F2',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
});
