/**
 * アプリケーション定数定義
 */

// 特殊タブID
export const DELETE_TAB_ID = 1;

// デフォルトタブID
export const DEFAULT_TAB_ID = 0;

// タブタイトルの最大文字数
export const MAX_TAB_TITLE_LENGTH = 8;

// カラーリスト (仕様書セクション4.2.3参照)
export const COLOR_LIST = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey',
] as const;

export type ColorType = (typeof COLOR_LIST)[number];

// アイコンリスト (仕様書セクション4.2.3参照)
export const ICON_LIST = [
  'circle',
  'square',
  'triangle',
  'star',
  'heart',
  'bookmark',
  'flag',
  'bell',
  'home',
  'work',
  'school',
  'shopping',
  'fitness',
  'music',
  'movie',
  'game',
  'book',
  'food',
  'travel',
  'code',
] as const;

export type IconType = (typeof ICON_LIST)[number];

// デフォルトタブ設定
export const DEFAULT_TABS = [
  {
    id: DEFAULT_TAB_ID,
    title: 'todo',
    color: 'blue' as ColorType,
    icon: 'circle' as IconType,
    order: 0,
  },
  {
    id: DELETE_TAB_ID,
    title: 'Delete',
    color: 'grey' as ColorType,
    icon: 'circle' as IconType,
    order: 1,
  },
] as const;
