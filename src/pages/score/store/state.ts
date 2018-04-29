import { Score } from '../../../entities/Score'

/**
 * 状態
 */
export interface State {
  loading: boolean;
  scores: Score[][];
}

/**
 * 初期状態
 */
export const initialState = {
  loading: false,
  scores: []
}