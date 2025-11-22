/**
 * データベースエンティティの型定義
 */

/**
 * Taskエンティティ
 * データベースに保存されるタスクの構造
 */
export interface TaskEntity {
  id: number;
  subject: string;
  done: boolean;
  tabId: number;
  order: number;
  created: number; // Unix timestamp (milliseconds)
}

/**
 * Tabエンティティ
 * データベースに保存されるタブの構造
 */
export interface TabEntity {
  id: number;
  title: string;
  color: string;
  icon: string;
  order: number;
  created: number; // Unix timestamp (milliseconds)
}
