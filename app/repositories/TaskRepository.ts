/**
 * TaskRepository
 * タスクのデータアクセス層
 */

import type { TaskEntity } from '../types';
import { getCurrentTimestamp } from '../utils';
import { Storage } from './storage';

const TASKS_STORAGE_KEY = 'tasks';

export class TaskRepository {
  /**
   * すべてのタスクを取得
   * @returns TaskEntityの配列
   */
  static async getAllTasks(): Promise<TaskEntity[]> {
    const tasks = await Storage.load<TaskEntity[]>(TASKS_STORAGE_KEY);
    return tasks || [];
  }

  /**
   * 特定のタブのタスクを取得
   * @param tabId - タブID
   * @returns TaskEntityの配列
   */
  static async getTasksByTabId(tabId: number): Promise<TaskEntity[]> {
    const allTasks = await TaskRepository.getAllTasks();
    return allTasks.filter((task) => task.tabId === tabId);
  }

  /**
   * タスクIDでタスクを取得
   * @param taskId - タスクID
   * @returns TaskEntity、存在しない場合はnull
   */
  static async getTaskById(taskId: number): Promise<TaskEntity | null> {
    const allTasks = await TaskRepository.getAllTasks();
    return allTasks.find((task) => task.id === taskId) || null;
  }

  /**
   * 新しいタスクを作成
   * @param tabId - タスクが属するタブID
   * @returns 作成されたタスクのID
   */
  static async createTask(tabId: number): Promise<number> {
    const allTasks = await TaskRepository.getAllTasks();

    // 新しいIDを生成（最大ID + 1）
    const newId = allTasks.length > 0 ? Math.max(...allTasks.map((t) => t.id)) + 1 : 1;

    const newTask: TaskEntity = {
      id: newId,
      subject: '',
      done: false,
      tabId,
      order: 0,
      created: getCurrentTimestamp(),
    };

    allTasks.push(newTask);
    await Storage.save(TASKS_STORAGE_KEY, allTasks);

    return newId;
  }

  /**
   * タスクの件名を更新
   * @param taskId - タスクID
   * @param subject - 新しい件名
   */
  static async updateTaskSubject(taskId: number, subject: string): Promise<void> {
    const allTasks = await TaskRepository.getAllTasks();
    const taskIndex = allTasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    allTasks[taskIndex] = {
      ...allTasks[taskIndex],
      subject,
    };

    await Storage.save(TASKS_STORAGE_KEY, allTasks);
  }

  /**
   * タスクの完了状態をトグル
   * @param taskId - タスクID
   */
  static async toggleTaskDone(taskId: number): Promise<void> {
    const allTasks = await TaskRepository.getAllTasks();
    const taskIndex = allTasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    allTasks[taskIndex] = {
      ...allTasks[taskIndex],
      done: !allTasks[taskIndex].done,
    };

    await Storage.save(TASKS_STORAGE_KEY, allTasks);
  }

  /**
   * タスクのタブIDを更新（タブ間移動）
   * @param taskId - タスクID
   * @param newTabId - 新しいタブID
   */
  static async updateTaskTabId(taskId: number, newTabId: number): Promise<void> {
    const allTasks = await TaskRepository.getAllTasks();
    const taskIndex = allTasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error(`Task with id ${taskId} not found`);
    }

    allTasks[taskIndex] = {
      ...allTasks[taskIndex],
      tabId: newTabId,
    };

    await Storage.save(TASKS_STORAGE_KEY, allTasks);
  }

  /**
   * タスクを削除
   * @param taskId - タスクID
   */
  static async deleteTask(taskId: number): Promise<void> {
    const allTasks = await TaskRepository.getAllTasks();
    const filteredTasks = allTasks.filter((task) => task.id !== taskId);
    await Storage.save(TASKS_STORAGE_KEY, filteredTasks);
  }

  /**
   * 特定のタブのすべてのタスクを削除
   * @param tabId - タブID
   */
  static async deleteTasksByTabId(tabId: number): Promise<void> {
    const allTasks = await TaskRepository.getAllTasks();
    const filteredTasks = allTasks.filter((task) => task.tabId !== tabId);
    await Storage.save(TASKS_STORAGE_KEY, filteredTasks);
  }

  /**
   * すべてのタスクを削除（開発用）
   */
  static async deleteAllTasks(): Promise<void> {
    await Storage.save(TASKS_STORAGE_KEY, []);
  }
}
