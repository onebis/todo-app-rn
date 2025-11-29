/**
 * Type Guards
 * 型ガード関数
 */

import type { TabEntity, TaskEntity } from './entities';

/**
 * TaskEntityの型ガード
 */
export const isTaskEntity = (obj: any): obj is TaskEntity => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.subject === 'string' &&
    typeof obj.done === 'boolean' &&
    typeof obj.tabId === 'number' &&
    typeof obj.order === 'number' &&
    typeof obj.created === 'number'
  );
};

/**
 * TabEntityの型ガード
 */
export const isTabEntity = (obj: any): obj is TabEntity => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.color === 'string' &&
    typeof obj.icon === 'string' &&
    typeof obj.order === 'number' &&
    typeof obj.created === 'number'
  );
};

/**
 * TaskEntity配列の型ガード
 */
export const isTaskEntityArray = (obj: any): obj is TaskEntity[] => {
  return Array.isArray(obj) && obj.every(isTaskEntity);
};

/**
 * TabEntity配列の型ガード
 */
export const isTabEntityArray = (obj: any): obj is TabEntity[] => {
  return Array.isArray(obj) && obj.every(isTabEntity);
};
