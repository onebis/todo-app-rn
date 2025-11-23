/**
 * テーマ定数
 * アプリ全体のデザインシステムの定数を定義
 */

export const COLORS = {
  backgroundColor: '#E0E0E0',
  mainListBackgroundColor: '#F2F2F2',
  activeTabColor: '#F2F2F2',
  inactiveTabColor: '#BDBDBD',
  borderBottomColor: '#E0E0E0',
  willAcceptColor: 'rgba(242, 242, 242, 0.76)',
  closeButtonColor: '#616161',
  textNormal: '#000000',
  textDone: '#757575',
  textDisabled: '#BDBDBD',
  primary: '#2196F3',
  delete: '#F44336',
  success: '#4CAF50',
  warning: '#FFC107',
  loading: '#9C27B0',
  white: '#FFFFFF',
} as const;

export const SPACING = {
  xs: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
} as const;

export const BORDER_RADIUS = {
  main: 24,
  taskList: 10,
  tab: 5,
  modal: 20,
  fab: 28,
} as const;

export const FONT_SIZE = {
  bodyLarge: 16,
  bodyMedium: 14,
  button: 14,
  title: 20,
  icon: {
    small: 24,
    medium: 30,
    large: 50,
  },
} as const;

export const FONT_WEIGHT = {
  normal: '400' as const,
  medium: '500' as const,
  bold: '700' as const,
};

export const SHADOW = {
  standard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dragHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fab: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
} as const;

export const SIZES = {
  header: 60,
  tabItem: 70,
  fab: 56,
  checkbox: 30,
  touchTarget: 48,
} as const;

export const LAYOUT = {
  taskListWidth: 0.8,
  tabListWidth: 0.2,
} as const;
