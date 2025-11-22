/**
 * 日付関連のユーティリティ関数
 */

/**
 * Unix timestamp (ミリ秒) を ISO 8601 形式の文字列に変換
 * @param timestamp - Unix timestamp (ミリ秒)
 * @returns ISO 8601形式の日付文字列
 */
export const timestampToISO = (timestamp: number): string => {
  return new Date(timestamp).toISOString();
};

/**
 * ISO 8601 形式の文字列を Unix timestamp (ミリ秒) に変換
 * @param isoString - ISO 8601形式の日付文字列
 * @returns Unix timestamp (ミリ秒)
 */
export const isoToTimestamp = (isoString: string): number => {
  return new Date(isoString).getTime();
};

/**
 * 現在のタイムスタンプを取得
 * @returns 現在のUnix timestamp (ミリ秒)
 */
export const getCurrentTimestamp = (): number => {
  return Date.now();
};
