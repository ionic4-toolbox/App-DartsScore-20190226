import { Action } from '@ngrx/store'
import { Score } from '../../../entities/Score'

export const CREATE         = '[Score] Create'
export const CREATE_SUCCESS = '[Score] Create Success'
export const CREATE_FAILURE = '[Score] Create Failure'

/**
 * 作成
 */
export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: Score[][]) {}
}

/**
 * 作成成功
 */
export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Score[][]) {}
}

/**
 * 作成失敗
 */
export class CreateFailure implements Action {
  readonly type = CREATE_FAILURE;
  constructor(public payload?: any) {}
}

export type Actions = Create | CreateSuccess | CreateFailure;