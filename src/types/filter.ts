import type { OperatorType } from './field';

/**
 * Base filter condition structure
 */
export interface FilterCondition {
  id: string;
  field: string;
  operator: OperatorType;
  value: FilterValue;
}

/**
 * Filter value types - can be single value, array, or range
 */
export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | { min: number; max: number }
  | { start: string; end: string }
  | null;

/**
 * Validation error for a filter condition
 */
export interface FilterValidationError {
  filterId: string;
  message: string;
}

/**
 * Filter state management
 */
export interface FilterState {
  conditions: FilterCondition[];
  errors: FilterValidationError[];
}
