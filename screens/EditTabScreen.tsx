/**
 * EditTabScreen
 * タブ作成・編集画面
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/app/contexts';
import { ColorIndicator, IconComponent, ColorPickerModal, IconPickerModal } from '@/app/components/common';
import { ColorType, IconType } from '@/app/constants/app';
import {useNavigation} from "@react-navigation/native";

interface EditTabScreenProps {
  mode: 'create' | 'edit';
  tabId?: number;
  onClose: () => void;
}

export const EditTabScreen: React.FC = () => {
    const navigation = useNavigation();
    const onClose = () => {
        navigation.navigate("Home" as never);
    }

  const { tabList, editTabState } = useAppContext();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  //
  // // 初期化
  // useEffect(() => {
  //   if (mode === 'create') {
  //     editTabState.initializeForCreate();
  //   } else if (mode === 'edit' && tabId !== undefined) {
  //     const tab = tabList.state.tabList.find((t) => t.id === tabId);
  //     if (tab) {
  //       editTabState.initializeForEdit(tab.id, tab.title, tab.color, tab.icon);
  //     }
  //   }
  // }, [mode, tabId]);
  //
  // // 保存処理
  // const handleSave = async () => {
  //   const title = editTabState.state.editTabTitle.trim();
  //
  //   if (!title) {
  //     Alert.alert('エラー', 'タブ名を入力してください');
  //     return;
  //   }
  //
  //   try {
  //     if (mode === 'create') {
  //       await tabList.createTab(
  //         title,
  //         editTabState.state.editTabColor,
  //         editTabState.state.editTabIcon
  //       );
  //     } else if (editTabState.state.editTabId !== null) {
  //       await tabList.updateTab(
  //         editTabState.state.editTabId,
  //         title,
  //         editTabState.state.editTabColor,
  //         editTabState.state.editTabIcon
  //       );
  //     }
  //
  //     editTabState.reset();
  //     onClose();
  //   } catch (error) {
  //     Alert.alert('エラー', 'タブの保存に失敗しました');
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 bg-app-background">
      {/* ヘッダー */}
      <View className="h-[60px] flex-row items-center px-md bg-white">
        <TouchableOpacity
          onPress={onClose}
          className="w-10 h-10 justify-center items-center"
        >
          <Text className="text-2xl text-black">✕</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-xl font-bold text-black text-center mr-10">
          {/*{mode === 'create' ? 'タブを作成' : 'タブを編集'}*/}
        </Text>
      </View>

      {/*/!* フォーム *!/*/}
      {/*<View className="flex-1 p-xl">*/}
      {/*  <View className="bg-white rounded-main p-xl">*/}
      {/*    /!* タブ名入力 *!/*/}
      {/*    <View className="mb-lg">*/}
      {/*      <Text className="text-body-medium font-medium text-black mb-2">*/}
      {/*        タブ名*/}
      {/*      </Text>*/}
      {/*      <TextInput*/}
      {/*        className="border border-gray-300 rounded px-4 py-3 text-body-large text-black"*/}
      {/*        value={editTabState.state.editTabTitle}*/}
      {/*        onChangeText={editTabState.setEditTabTitle}*/}
      {/*        placeholder="タブ名を入力（最大8文字）"*/}
      {/*        placeholderTextColor="#BDBDBD"*/}
      {/*        maxLength={8}*/}
      {/*        autoFocus*/}
      {/*      />*/}
      {/*      <Text className="text-xs text-gray-500 mt-1 text-right">*/}
      {/*        {editTabState.state.editTabTitle.length}/8*/}
      {/*      </Text>*/}
      {/*    </View>*/}

      {/*    /!* カラー選択 *!/*/}
      {/*    <View className="mb-lg">*/}
      {/*      <Text className="text-body-medium font-medium text-black mb-2">*/}
      {/*        カラー*/}
      {/*      </Text>*/}
      {/*      <TouchableOpacity*/}
      {/*        onPress={() => setShowColorPicker(true)}*/}
      {/*        className="border border-gray-300 rounded px-4 py-3 flex-row items-center"*/}
      {/*      >*/}
      {/*        <ColorIndicator*/}
      {/*          color={editTabState.state.editTabColor as ColorType}*/}
      {/*          size={30}*/}
      {/*        />*/}
      {/*        <Text className="ml-3 text-body-large text-black">*/}
      {/*          カラーを選択*/}
      {/*        </Text>*/}
      {/*      </TouchableOpacity>*/}
      {/*    </View>*/}

      {/*    /!* アイコン選択 *!/*/}
      {/*    <View className="mb-xl">*/}
      {/*      <Text className="text-body-medium font-medium text-black mb-2">*/}
      {/*        アイコン*/}
      {/*      </Text>*/}
      {/*      <TouchableOpacity*/}
      {/*        onPress={() => setShowIconPicker(true)}*/}
      {/*        className="border border-gray-300 rounded px-4 py-3 flex-row items-center"*/}
      {/*      >*/}
      {/*        <IconComponent*/}
      {/*          icon={editTabState.state.editTabIcon as IconType}*/}
      {/*          size={30}*/}
      {/*        />*/}
      {/*        <Text className="ml-3 text-body-large text-black">*/}
      {/*          アイコンを選択*/}
      {/*        </Text>*/}
      {/*      </TouchableOpacity>*/}
      {/*    </View>*/}

      {/*    /!* 保存ボタン *!/*/}
      {/*    <TouchableOpacity*/}
      {/*      onPress={handleSave}*/}
      {/*      className="bg-blue-500 rounded py-4 items-center"*/}
      {/*    >*/}
      {/*      <Text className="text-button font-medium text-white">*/}
      {/*        {mode === 'create' ? '新規作成' : '確定'}*/}
      {/*      </Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*</View>*/}

      {/* カラー選択モーダル */}
      <ColorPickerModal
        visible={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        onSelectColor={editTabState.setEditTabColor}
        selectedColor={editTabState.state.editTabColor as ColorType}
      />

      {/* アイコン選択モーダル */}
      <IconPickerModal
        visible={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        onSelectIcon={editTabState.setEditTabIcon}
        selectedIcon={editTabState.state.editTabIcon as IconType}
      />
    </SafeAreaView>
  );
};
