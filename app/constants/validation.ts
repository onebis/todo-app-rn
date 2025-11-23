/**
 * バリデーション定数
 */

export const VALIDATION = {
  TAB_TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 8,
  },
  TASK_SUBJECT: {
    MAX_LENGTH: 500, // 実質的な制限
  },
} as const;

/**
 * エラーメッセージ
 */
export const ERROR_MESSAGES = {
  TAB_TITLE_REQUIRED: 'タブ名を入力してください',
  TAB_TITLE_TOO_LONG: 'タブ名は8文字以内で入力してください',
  TASK_CREATE_FAILED: 'タスクの作成に失敗しました',
  TASK_UPDATE_FAILED: 'タスクの更新に失敗しました',
  TASK_DELETE_FAILED: 'タスクの削除に失敗しました',
  TAB_CREATE_FAILED: 'タブの作成に失敗しました',
  TAB_UPDATE_FAILED: 'タブの更新に失敗しました',
  TAB_DELETE_FAILED: 'タブの削除に失敗しました',
  TAB_DELETE_PROTECTED: 'DELETEタブは削除できません',
  NETWORK_ERROR: 'ネットワークエラーが発生しました',
  UNKNOWN_ERROR: '予期しないエラーが発生しました',
} as const;

/**
 * 成功メッセージ
 */
export const SUCCESS_MESSAGES = {
  TAB_CREATED: 'タブを作成しました',
  TAB_UPDATED: 'タブを更新しました',
  TAB_DELETED: 'タブを削除しました',
  TASK_DELETED: '削除しました',
} as const;
