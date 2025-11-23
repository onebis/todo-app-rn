/**
 * TabList
 * タブのリストを表示するコンポーネント
 */

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TabState } from '../../types';
import { TabItem } from './TabItem';

interface TabListProps {
  tabs: TabState[];
  activeTabId: number;
  onTabPress: (tabId: number) => void;
}

export const TabList: React.FC<TabListProps> = ({
  tabs,
  activeTabId,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TabItem
            tab={item}
            isActive={item.id === activeTabId}
            onPress={onTabPress}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '20%',
    backgroundColor: '#E0E0E0',
  },
  listContent: {
    padding: 10,
  },
});
