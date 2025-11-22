/**
 * TabRepository
 * タブのデータアクセス層
 */

import { TabEntity } from '../types';
import { Storage } from './storage';
import { getCurrentTimestamp } from '../utils';
import { DELETE_TAB_ID, DEFAULT_TABS } from '../constants/app';

const TABS_STORAGE_KEY = 'tabs';

export class TabRepository {
  /**
   * すべてのタブを取得（order順にソート）
   * @returns TabEntityの配列
   */
  static async getAllTabs(): Promise<TabEntity[]> {
    const tabs = await Storage.load<TabEntity[]>(TABS_STORAGE_KEY);
    if (!tabs) {
      return [];
    }
    // order順にソート
    return tabs.sort((a, b) => a.order - b.order);
  }

  /**
   * タブIDでタブを取得
   * @param tabId - タブID
   * @returns TabEntity、存在しない場合はnull
   */
  static async getTabById(tabId: number): Promise<TabEntity | null> {
    const allTabs = await this.getAllTabs();
    return allTabs.find((tab) => tab.id === tabId) || null;
  }

  /**
   * タブが存在するかチェック
   * @returns タブが1つ以上存在する場合true
   */
  static async hasAnyTabs(): Promise<boolean> {
    const tabs = await this.getAllTabs();
    return tabs.length > 0;
  }

  /**
   * デフォルトタブを初期化
   * 初回起動時にデフォルトのタブを作成
   */
  static async initializeDefaultTabs(): Promise<void> {
    const hasAny = await this.hasAnyTabs();
    if (hasAny) {
      return; // すでにタブが存在する場合は何もしない
    }

    const defaultTabs: TabEntity[] = DEFAULT_TABS.map((tab) => ({
      id: tab.id,
      title: tab.title,
      color: tab.color,
      icon: tab.icon,
      order: tab.order,
      created: getCurrentTimestamp(),
    }));

    await Storage.save(TABS_STORAGE_KEY, defaultTabs);
  }

  /**
   * 新しいタブを作成
   * @param title - タブ名
   * @param color - カラー
   * @param icon - アイコン
   * @returns 作成されたタブのID
   */
  static async createTab(
    title: string,
    color: string,
    icon: string
  ): Promise<number> {
    const allTabs = await this.getAllTabs();

    // 新しいIDを生成（最大ID + 1）
    const newId = allTabs.length > 0
      ? Math.max(...allTabs.map((t) => t.id)) + 1
      : 2; // ID 0, 1 はデフォルトタブで使用

    const newTab: TabEntity = {
      id: newId,
      title,
      color,
      icon,
      order: 0, // 先頭に追加
      created: getCurrentTimestamp(),
    };

    // 既存のタブのorderを+1する
    const updatedTabs = allTabs.map((tab) => ({
      ...tab,
      order: tab.order + 1,
    }));

    updatedTabs.unshift(newTab); // 先頭に追加
    await Storage.save(TABS_STORAGE_KEY, updatedTabs);

    return newId;
  }

  /**
   * タブを更新
   * @param tabId - タブID
   * @param title - 新しいタブ名
   * @param color - 新しいカラー
   * @param icon - 新しいアイコン
   */
  static async updateTab(
    tabId: number,
    title: string,
    color: string,
    icon: string
  ): Promise<void> {
    const allTabs = await this.getAllTabs();
    const tabIndex = allTabs.findIndex((tab) => tab.id === tabId);

    if (tabIndex === -1) {
      throw new Error(`Tab with id ${tabId} not found`);
    }

    allTabs[tabIndex] = {
      ...allTabs[tabIndex],
      title,
      color,
      icon,
    };

    await Storage.save(TABS_STORAGE_KEY, allTabs);
  }

  /**
   * タブの並び順を更新
   * @param tabId - タブID
   * @param newOrder - 新しい順序
   */
  static async updateTabOrder(tabId: number, newOrder: number): Promise<void> {
    const allTabs = await this.getAllTabs();
    const tabIndex = allTabs.findIndex((tab) => tab.id === tabId);

    if (tabIndex === -1) {
      throw new Error(`Tab with id ${tabId} not found`);
    }

    allTabs[tabIndex] = {
      ...allTabs[tabIndex],
      order: newOrder,
    };

    await Storage.save(TABS_STORAGE_KEY, allTabs);
  }

  /**
   * タブを削除
   * @param tabId - タブID
   */
  static async deleteTab(tabId: number): Promise<void> {
    // DELETE_TAB_IDは削除不可
    if (tabId === DELETE_TAB_ID) {
      throw new Error('Cannot delete the DELETE tab');
    }

    const allTabs = await this.getAllTabs();
    const filteredTabs = allTabs.filter((tab) => tab.id !== tabId);

    // order を正規化（0, 1, 2, ...）
    const normalizedTabs = filteredTabs.map((tab, index) => ({
      ...tab,
      order: index,
    }));

    await Storage.save(TABS_STORAGE_KEY, normalizedTabs);
  }

  /**
   * タブの並び替え
   * @param oldIndex - 元のインデックス
   * @param newIndex - 新しいインデックス
   */
  static async reorderTabs(oldIndex: number, newIndex: number): Promise<void> {
    const allTabs = await this.getAllTabs();

    if (oldIndex < 0 || oldIndex >= allTabs.length) {
      throw new Error(`Invalid oldIndex: ${oldIndex}`);
    }
    if (newIndex < 0 || newIndex >= allTabs.length) {
      throw new Error(`Invalid newIndex: ${newIndex}`);
    }

    // タブを移動
    const [movedTab] = allTabs.splice(oldIndex, 1);
    allTabs.splice(newIndex, 0, movedTab);

    // order を正規化（0, 1, 2, ...）
    const normalizedTabs = allTabs.map((tab, index) => ({
      ...tab,
      order: index,
    }));

    await Storage.save(TABS_STORAGE_KEY, normalizedTabs);
  }

  /**
   * すべてのタブを削除（開発用）
   */
  static async deleteAllTabs(): Promise<void> {
    await Storage.save(TABS_STORAGE_KEY, []);
  }
}
