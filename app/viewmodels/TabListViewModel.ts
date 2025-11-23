/**
 * TabListViewModel
 * タブリストの状態とビジネスロジックを管理
 */

import { useState, useCallback } from 'react';
import { TabState, TabListState } from '../types';
import { TabRepository, TaskRepository } from '../repositories';
import { tabEntitiesToStates } from '../utils';
import { DEFAULT_TAB_ID } from '../constants/app';

export const useTabListViewModel = () => {
  const [state, setState] = useState<TabListState>({
    tabList: [],
    isLoading: false,
    error: null,
  });

  /**
   * すべてのタブを取得
   */
  const fetchAllTabs = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const entities = await TabRepository.getAllTabs();
      const tabStates = tabEntitiesToStates(entities);
      setState({
        tabList: tabStates,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to fetch tabs:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'タブの取得に失敗しました',
      }));
    }
  }, []);

  /**
   * アプリ初期化時にデフォルトタブを作成
   */
  const initializeDefaultTabs = useCallback(async () => {
    try {
      await TabRepository.initializeDefaultTabs();
      await fetchAllTabs();
    } catch (error) {
      console.error('Failed to initialize default tabs:', error);
      setState((prev) => ({
        ...prev,
        error: 'デフォルトタブの初期化に失敗しました',
      }));
    }
  }, [fetchAllTabs]);

  /**
   * 新しいタブを作成
   */
  const createTab = useCallback(async (
    title: string,
    color: string,
    icon: string
  ): Promise<number> => {
    try {
      const newTabId = await TabRepository.createTab(title, color, icon);
      await fetchAllTabs();
      return newTabId;
    } catch (error) {
      console.error('Failed to create tab:', error);
      setState((prev) => ({
        ...prev,
        error: 'タブの作成に失敗しました',
      }));
      throw error;
    }
  }, [fetchAllTabs]);

  /**
   * タブを更新
   */
  const updateTab = useCallback(async (
    tabId: number,
    title: string,
    color: string,
    icon: string
  ) => {
    try {
      await TabRepository.updateTab(tabId, title, color, icon);
      await fetchAllTabs();
    } catch (error) {
      console.error('Failed to update tab:', error);
      setState((prev) => ({
        ...prev,
        error: 'タブの更新に失敗しました',
      }));
    }
  }, [fetchAllTabs]);

  /**
   * タブを削除（カスケード削除）
   */
  const deleteTab = useCallback(async (
    tabId: number,
    onTabDeleted: (newActiveTabId: number) => void
  ) => {
    try {
      // タブに含まれるすべてのタスクを削除
      await TaskRepository.deleteTasksByTabId(tabId);

      // タブを削除
      await TabRepository.deleteTab(tabId);

      // タブリストを再取得
      await fetchAllTabs();

      // 削除後、最初のタブをアクティブにする
      const tabs = await TabRepository.getAllTabs();
      if (tabs.length > 0) {
        onTabDeleted(tabs[0].id);
      } else {
        onTabDeleted(DEFAULT_TAB_ID);
      }
    } catch (error) {
      console.error('Failed to delete tab:', error);
      setState((prev) => ({
        ...prev,
        error: 'タブの削除に失敗しました',
      }));
    }
  }, [fetchAllTabs]);

  /**
   * タブの並び順を変更
   */
  const reorderTabs = useCallback(async (oldIndex: number, newIndex: number) => {
    try {
      await TabRepository.reorderTabs(oldIndex, newIndex);
      await fetchAllTabs();
    } catch (error) {
      console.error('Failed to reorder tabs:', error);
      setState((prev) => ({
        ...prev,
        error: 'タブの並び替えに失敗しました',
      }));
    }
  }, [fetchAllTabs]);

  return {
    state,
    fetchAllTabs,
    initializeDefaultTabs,
    createTab,
    updateTab,
    deleteTab,
    reorderTabs,
  };
};
