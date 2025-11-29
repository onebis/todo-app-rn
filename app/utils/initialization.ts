/**
 * アプリケーション初期化ユーティリティ
 */

import { DEFAULT_TAB_ID } from '../constants/app';
import { TabRepository } from '../repositories';

/**
 * アプリケーションの初期化
 * - デフォルトタブがない場合は作成
 * - 初期アクティブタブIDを返す
 */
export const initializeApp = async (): Promise<number> => {
  try {
    // デフォルトタブが存在するかチェック
    const hasAnyTabs = await TabRepository.hasAnyTabs();

    if (!hasAnyTabs) {
      // デフォルトタブを作成
      await TabRepository.initializeDefaultTabs();
    }

    // 最初のタブをアクティブタブとして返す
    const tabs = await TabRepository.getAllTabs();
    return tabs.length > 0 ? tabs[0].id : DEFAULT_TAB_ID;
  } catch (error) {
    console.error('Failed to initialize app:', error);
    return DEFAULT_TAB_ID;
  }
};
