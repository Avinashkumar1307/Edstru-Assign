/**
 * Supported field data types
 */
export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'amount'
  | 'single-select'
  | 'multi-select'
  | 'boolean';

/**
 * Text field operators
 */
export type TextOperator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'notContains'
  | 'regex';

/**
 * Number field operators
 */
export type NumberOperator =
  | 'equals'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'between';

/**
 * Date field operators
 */
export type DateOperator = 'between';

/**
 * Amount field operators
 */
export type AmountOperator = 'between';

/**
 * Single select operators
 */
export type SingleSelectOperator = 'is' | 'isNot';

/**
 * Multi-select operators
 */
export type MultiSelectOperator = 'in' | 'notIn';

/**
 * Boolean operators
 */
export type BooleanOperator = 'is';

/**
 * Union of all operator types
 */
export type OperatorType =
  | TextOperator
  | NumberOperator
  | DateOperator
  | AmountOperator
  | SingleSelectOperator
  | MultiSelectOperator
  | BooleanOperator;

/**
 * Field definition with metadata
 */
export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  options?: string[]; // For select fields
}

/**
 * Operator definition with label
 */
export interface OperatorDefinition {
  value: OperatorType;
  label: string;
}

/**
 * Maps field types to their available operators
 */
export const FIELD_OPERATORS: Record<FieldType, OperatorDefinition[]> = {
  text: [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'notContains', label: 'Does Not Contain' },
    { value: 'regex', label: 'Regex Match (Advanced)' },
  ],
  number: [
    { value: 'equals', label: 'Equals' },
    { value: 'greaterThan', label: 'Greater Than' },
    { value: 'lessThan', label: 'Less Than' },
    { value: 'greaterThanOrEqual', label: 'Greater Than or Equal' },
    { value: 'lessThanOrEqual', label: 'Less Than or Equal' },
    { value: 'between', label: 'Between' },
  ],
  date: [{ value: 'between', label: 'Between' }],
  amount: [{ value: 'between', label: 'Between' }],
  'single-select': [
    { value: 'is', label: 'Is' },
    { value: 'isNot', label: 'Is Not' },
  ],
  'multi-select': [
    { value: 'in', label: 'In' },
    { value: 'notIn', label: 'Not In' },
  ],
  boolean: [{ value: 'is', label: 'Is' }],
};
