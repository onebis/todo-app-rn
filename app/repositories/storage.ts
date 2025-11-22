/**
 * AsyncStorageのラッパークラス
 * データの永続化を担当
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  /**
   * データを保存
   * @param key - ストレージキー
   * @param value - 保存する値(任意の型)
   */
  static async save<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Storage save error for key: ${key}`, error);
      throw error;
    }
  }

  /**
   * データを取得
   * @param key - ストレージキー
   * @returns 保存されたデータ、存在しない場合はnull
   */
  static async load<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Storage load error for key: ${key}`, error);
      throw error;
    }
  }

  /**
   * データを削除
   * @param key - ストレージキー
   */
  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage remove error for key: ${key}`, error);
      throw error;
    }
  }

  /**
   * すべてのデータを削除
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error', error);
      throw error;
    }
  }

  /**
   * すべてのキーを取得
   * @returns キーの配列
   */
  static async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return [...keys];
    } catch (error) {
      console.error('Storage getAllKeys error', error);
      throw error;
    }
  }
}
