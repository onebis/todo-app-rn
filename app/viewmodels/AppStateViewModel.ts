/**
 * AppStateViewModel
 * アプリ全体の状態とビジネスロジックを管理
 */

import { useState, useCallback } from 'react';
import { AppState } from '../types';
import { DEFAULT_TAB_ID } from '../constants/app';

export const useAppStateViewModel = () => {
  const [state, setState] = useState<AppState>({
    activeTabId: DEFAULT_TAB_ID,
    activeEditId: 0,
  });

  /**
   * アクティブなタブを設定
   */
  const setActiveTabId = useCallback((tabId: number) => {
    setState((prev) => ({
      ...prev,
      activeTabId: tabId,
      activeEditId: 0, // タブ切り替え時は編集モードを解除
    }));
  }, []);

  /**
   * 編集中のタスクIDを設定
   */
  const setActiveEditId = useCallback((taskId: number) => {
    setState((prev) => ({
      ...prev,
      activeEditId: taskId,
    }));
  }, []);

  /**
   * 編集モードを終了
   */
  const exitEditMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activeEditId: 0,
    }));
  }, []);

  return {
    state,
    setActiveTabId,
    setActiveEditId,
    exitEditMode,
  };
};
