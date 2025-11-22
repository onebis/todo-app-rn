/**
 * エンティティと状態の変換関数
 */

import { TaskEntity, TabEntity, TaskState, TabState } from '../types';
import { timestampToISO } from './date';

/**
 * TaskEntity を TaskState に変換
 * @param entity - TaskEntity
 * @returns TaskState
 */
export const taskEntityToState = (entity: TaskEntity): TaskState => {
  return {
    id: entity.id,
    subject: entity.subject,
    done: entity.done,
    tabId: entity.tabId,
    created: timestampToISO(entity.created),
  };
};

/**
 * TaskEntity の配列を TaskState の配列に変換
 * @param entities - TaskEntity[]
 * @returns TaskState[]
 */
export const taskEntitiesToStates = (entities: TaskEntity[]): TaskState[] => {
  return entities.map(taskEntityToState);
};

/**
 * TabEntity を TabState に変換
 * @param entity - TabEntity
 * @returns TabState
 */
export const tabEntityToState = (entity: TabEntity): TabState => {
  return {
    id: entity.id,
    title: entity.title,
    color: entity.color,
    icon: entity.icon,
    order: entity.order,
  };
};

/**
 * TabEntity の配列を TabState の配列に変換
 * @param entities - TabEntity[]
 * @returns TabState[]
 */
export const tabEntitiesToStates = (entities: TabEntity[]): TabState[] => {
  return entities.map(tabEntityToState);
};
