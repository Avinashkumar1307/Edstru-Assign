import type { Employee } from '../types/employee';
import type { FilterCondition } from '../types/filter';
import type { FieldDefinition } from '../types/field';

/**
 * Get nested property value from an object using dot notation
 * e.g., getNestedValue(employee, 'address.city')
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Apply a single filter condition to an employee record
 */
export function applyFilterCondition(
  employee: Employee,
  condition: FilterCondition
): boolean {
  const fieldValue = getNestedValue(employee, condition.field);
  const { operator, value } = condition;

  // Handle null/undefined field values
  if (fieldValue === null || fieldValue === undefined) {
    return false;
  }

  // Text operators
  if (typeof fieldValue === 'string') {
    const fieldStr = fieldValue.toLowerCase();
    const valueStr = (value as string)?.toLowerCase() || '';

    switch (operator) {
      case 'equals':
        return fieldStr === valueStr;
      case 'contains':
        return fieldStr.includes(valueStr);
      case 'startsWith':
        return fieldStr.startsWith(valueStr);
      case 'endsWith':
        return fieldStr.endsWith(valueStr);
      case 'notContains':
        return !fieldStr.includes(valueStr);
      case 'regex':
        try {
          const regex = new RegExp(value as string, 'i');
          return regex.test(fieldValue);
        } catch (error) {
          // Invalid regex pattern
          console.error('Invalid regex pattern:', value, error);
          return false;
        }
      default:
        return true;
    }
  }

  // Number operators
  if (typeof fieldValue === 'number') {
    if (operator === 'between') {
      const range = value as { min: number; max: number };
      return fieldValue >= range.min && fieldValue <= range.max;
    }

    const numValue = value as number;
    switch (operator) {
      case 'equals':
        return fieldValue === numValue;
      case 'greaterThan':
        return fieldValue > numValue;
      case 'lessThan':
        return fieldValue < numValue;
      case 'greaterThanOrEqual':
        return fieldValue >= numValue;
      case 'lessThanOrEqual':
        return fieldValue <= numValue;
      default:
        return true;
    }
  }

  // Boolean operators
  if (typeof fieldValue === 'boolean') {
    return fieldValue === (value as boolean);
  }

  // Array operators (for multi-select)
  if (Array.isArray(fieldValue)) {
    const valueArray = value as string[];
    if (!valueArray || valueArray.length === 0) return true;

    switch (operator) {
      case 'in':
        // Check if any of the field values are in the filter values
        return fieldValue.some((item) => valueArray.includes(item));
      case 'notIn':
        // Check if none of the field values are in the filter values
        return !fieldValue.some((item) => valueArray.includes(item));
      default:
        return true;
    }
  }

  // Date operators (stored as strings in ISO format)
  if (
    condition.field.includes('Date') ||
    condition.field.includes('Review')
  ) {
    const dateValue = new Date(fieldValue as string);
    const range = value as { start: string; end: string };

    if (operator === 'between') {
      const startDate = new Date(range.start);
      const endDate = new Date(range.end);
      return dateValue >= startDate && dateValue <= endDate;
    }
  }

  // Single select operators
  if (operator === 'is') {
    return fieldValue === value;
  }
  if (operator === 'isNot') {
    return fieldValue !== value;
  }

  return true;
}

/**
 * Apply all filter conditions to the employee dataset
 * Uses AND logic between different fields
 */
export function applyFilters(
  employees: Employee[],
  conditions: FilterCondition[]
): Employee[] {
  if (conditions.length === 0) {
    return employees;
  }

  return employees.filter((employee) => {
    return conditions.every((condition) =>
      applyFilterCondition(employee, condition)
    );
  });
}

/**
 * Validate a filter condition value
 */
export function validateFilterValue(
  condition: FilterCondition,
  fieldDef: FieldDefinition
): string | null {
  const { operator, value } = condition;

  // Check for empty values
  if (value === null || value === undefined || value === '') {
    return 'Value is required';
  }

  // Validate range values
  if (operator === 'between') {
    if (fieldDef.type === 'number' || fieldDef.type === 'amount') {
      const range = value as { min: number; max: number };
      if (range.min === undefined || range.max === undefined) {
        return 'Both min and max values are required';
      }
      if (range.min > range.max) {
        return 'Min value cannot be greater than max value';
      }
    }

    if (fieldDef.type === 'date') {
      const range = value as { start: string; end: string };
      if (!range.start || !range.end) {
        return 'Both start and end dates are required';
      }
      if (new Date(range.start) > new Date(range.end)) {
        return 'Start date cannot be after end date';
      }
    }
  }

  // Validate multi-select
  if (operator === 'in' || operator === 'notIn') {
    const array = value as string[];
    if (!array || array.length === 0) {
      return 'At least one option must be selected';
    }
  }

  return null;
}

/**
 * Generate a unique ID for filter conditions
 */
export function generateFilterId(): string {
  return `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
