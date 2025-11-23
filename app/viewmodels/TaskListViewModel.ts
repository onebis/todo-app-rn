/**
 * TaskListViewModel
 * タスクリストの状態とビジネスロジックを管理
 */

import { useState, useCallback } from 'react';
import { TaskState, TaskListState } from '../types';
import { TaskRepository } from '../repositories';
import { taskEntitiesToStates } from '../utils';
import { DELETE_TAB_ID } from '../constants/app';

export const useTaskListViewModel = () => {
  const [state, setState] = useState<TaskListState>({
    taskList: [],
    isLoading: false,
    error: null,
  });

  /**
   * 特定のタブのタスクを取得
   */
  const fetchTasksByTabId = useCallback(async (tabId: number) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const entities = await TaskRepository.getTasksByTabId(tabId);
      const taskStates = taskEntitiesToStates(entities);
      setState({
        taskList: taskStates,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'タスクの取得に失敗しました',
      }));
    }
  }, []);

  /**
   * 新しいタスクを作成
   */
  const createTask = useCallback(async (tabId: number): Promise<number> => {
    try {
      const newTaskId = await TaskRepository.createTask(tabId);
      await fetchTasksByTabId(tabId);
      return newTaskId;
    } catch (error) {
      console.error('Failed to create task:', error);
      setState((prev) => ({
        ...prev,
        error: 'タスクの作成に失敗しました',
      }));
      throw error;
    }
  }, [fetchTasksByTabId]);

  /**
   * タスクの件名を更新
   */
  const updateTaskSubject = useCallback(async (taskId: number, subject: string) => {
    try {
      await TaskRepository.updateTaskSubject(taskId, subject);
      // リアルタイム更新のため、ここでは再取得しない
    } catch (error) {
      console.error('Failed to update task subject:', error);
      setState((prev) => ({
        ...prev,
        error: 'タスクの更新に失敗しました',
      }));
    }
  }, []);

  /**
   * タスクの完了状態をトグル
   */
  const toggleTaskDone = useCallback(async (taskId: number, currentTabId: number) => {
    try {
      await TaskRepository.toggleTaskDone(taskId);
      await fetchTasksByTabId(currentTabId);
    } catch (error) {
      console.error('Failed to toggle task done:', error);
      setState((prev) => ({
        ...prev,
        error: 'タスクの更新に失敗しました',
      }));
    }
  }, [fetchTasksByTabId]);

  /**
   * タスクをソフト削除（DELETEタブに移動）
   */
  const softDeleteTask = useCallback(async (
    taskId: number,
    currentTabId: number
  ): Promise<number> => {
    try {
      await TaskRepository.updateTaskTabId(taskId, DELETE_TAB_ID);
      await fetchTasksByTabId(currentTabId);
      return currentTabId; // Undo用に元のタブIDを返す
    } catch (error) {
      console.error('Failed to soft delete task:', error);
      setState((prev) => ({
        ...prev,
        error: 'タスクの削除に失敗しました',
      }));
      throw error;
    }
  }, [fetchTasksByTabId]);

  /**
   * ソフト削除を取り消し
   */
  const undoSoftDelete = useCallback(async (
    taskId: number,
    originalTabId: number,
    currentTabId: number
  ) => {
    try {
      await TaskRepository.updateTaskTabId(taskId, originalTabId);
      await fetchTasksByTabId(currentTabId);
    } catch (error) {
      console.error('Failed to undo soft delete:', error);
      setState((prev) => ({
        ...prev,
        error: 'Undoに失敗しました',
      }));
    }
  }, [fetchTasksByTabId]);

  /**
   * タスクを完全削除
   */
  const permanentlyDeleteTask = useCallback(async (taskId: number) => {
    try {
      await TaskRepository.deleteTask(taskId);
      await fetchTasksByTabId(DELETE_TAB_ID);
    } catch (error) {
      console.error('Failed to permanently delete task:', error);
      setState((prev) => ({
        ...prev,
        error: 'タスクの完全削除に失敗しました',
      }));
    }
  }, [fetchTasksByTabId]);

  /**
   * DELETEタブのすべてのタスクを完全削除
   */
  const deleteAllTasksInTrash = useCallback(async () => {
    try {
      await TaskRepository.deleteTasksByTabId(DELETE_TAB_ID);
      await fetchTasksByTabId(DELETE_TAB_ID);
    } catch (error) {
      console.error('Failed to delete all tasks in trash:', error);
      setState((prev) => ({
        ...prev,
        error: 'ゴミ箱の削除に失敗しました',
      }));
    }
  }, [fetchTasksByTabId]);

  /**
   * タスクを別のタブに移動
   */
  const moveTaskToTab = useCallback(async (
    taskId: number,
    targetTabId: number,
    currentTabId: number
  ) => {
    try {
      await TaskRepository.updateTaskTabId(taskId, targetTabId);
      await fetchTasksByTabId(currentTabId);
    } catch (error) {
      console.error('Failed to move task:', error);
      setState((prev) => ({
        ...prev,
        error: 'タスクの移動に失敗しました',
      }));
    }
  }, [fetchTasksByTabId]);

  return {
    state,
    fetchTasksByTabId,
    createTask,
    updateTaskSubject,
    toggleTaskDone,
    softDeleteTask,
    undoSoftDelete,
    permanentlyDeleteTask,
    deleteAllTasksInTrash,
    moveTaskToTab,
  };
};
