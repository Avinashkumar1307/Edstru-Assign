import { Box, FormControl, IconButton, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Trash2 } from 'lucide-react';
import type { FilterCondition as FilterConditionType, FilterValue, FieldDefinition, OperatorType } from '../types';
import { FIELD_OPERATORS } from '../types';
import {
  TextInput,
  NumberInput,
  NumberRangeInput,
  DateRangeInput,
  SingleSelectInput,
  MultiSelectInput,
  BooleanInput,
} from './FilterInputs';

interface FilterConditionProps {
  condition: FilterConditionType;
  fields: FieldDefinition[];
  onUpdate: (condition: FilterConditionType) => void;
  onRemove: () => void;
  error?: string;
}

/**
 * FilterCondition component - represents a single filter row
 * Dynamically renders appropriate inputs based on field type and operator
 * src/components/FilterCondition.tsx
 */
export function FilterCondition({
  condition,
  fields,
  onUpdate,
  onRemove,
  error,
}: FilterConditionProps) {
  const selectedField = fields.find((f) => f.key === condition.field);
  const availableOperators = selectedField ? FIELD_OPERATORS[selectedField.type] : [];

  const handleFieldChange = (event: SelectChangeEvent) => {
    const newField = event.target.value;
    const fieldDef = fields.find((f) => f.key === newField);

    if (fieldDef) {
      // Reset operator and value when field changes
      const defaultOperator = FIELD_OPERATORS[fieldDef.type][0].value;
      onUpdate({
        ...condition,
        field: newField,
        operator: defaultOperator,
        value: getDefaultValue(fieldDef.type, defaultOperator),
      });
    }
  };

  const handleOperatorChange = (event: SelectChangeEvent) => {
    const newOperator = event.target.value as OperatorType;
    onUpdate({
      ...condition,
      operator: newOperator,
      value: selectedField ? getDefaultValue(selectedField.type, newOperator) : null,
    });
  };

  const handleValueChange = (newValue: FilterValue) => {
    onUpdate({
      ...condition,
      value: newValue,
    });
  };

  /**
   * Get default value based on field type and operator
   */
  function getDefaultValue(fieldType: string, operator: OperatorType): FilterValue {
    if (operator === 'between') {
      if (fieldType === 'date') {
        return { start: '', end: '' };
      }
      return { min: 0, max: 0 };
    }

    if (fieldType === 'boolean') {
      return false;
    }

    if (fieldType === 'multi-select') {
      return [];
    }

    if (fieldType === 'number' || fieldType === 'amount') {
      return 0;
    }

    return '';
  }

  /**
   * Render the appropriate input component based on field type and operator
   */
  function renderValueInput() {
    if (!selectedField) return null;

    const { type, options = [] } = selectedField;
    const hasError = !!error;

    // Date range picker
    if (type === 'date' && condition.operator === 'between') {
      return (
        <DateRangeInput
          value={condition.value as { start: string; end: string }}
          onChange={handleValueChange}
          error={hasError}
          helperText={error}
        />
      );
    }

    // Number range (between operator)
    if ((type === 'number' || type === 'amount') && condition.operator === 'between') {
      return (
        <NumberRangeInput
          value={condition.value as { min: number; max: number }}
          onChange={handleValueChange}
          error={hasError}
          helperText={error}
          isAmount={type === 'amount'}
        />
      );
    }

    // Single number input
    if (type === 'number' || type === 'amount') {
      return (
        <NumberInput
          value={condition.value as number}
          onChange={handleValueChange}
          error={hasError}
          helperText={error}
          placeholder={type === 'amount' ? 'Enter amount...' : 'Enter number...'}
        />
      );
    }

    // Single select dropdown
    if (type === 'single-select') {
      return (
        <SingleSelectInput
          value={condition.value as string}
          onChange={handleValueChange}
          options={options}
          error={hasError}
          helperText={error}
        />
      );
    }

    // Multi-select dropdown
    if (type === 'multi-select') {
      return (
        <MultiSelectInput
          value={condition.value as string[]}
          onChange={handleValueChange}
          options={options}
          error={hasError}
          helperText={error}
        />
      );
    }

    // Boolean toggle
    if (type === 'boolean') {
      return (
        <BooleanInput
          value={condition.value as boolean}
          onChange={handleValueChange}
          error={hasError}
          helperText={error}
        />
      );
    }

    // Default to text input
    return (
      <TextInput
        value={condition.value as string}
        onChange={handleValueChange}
        error={hasError}
        helperText={error}
      />
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
        p: 2.5,
        border: '2px solid',
        borderColor: error ? 'error.main' : 'rgba(37, 99, 235, 0.15)',
        borderRadius: 2,
        backgroundColor: error ? 'rgba(239, 68, 68, 0.05)' : 'white',
        boxShadow: error
          ? '0 4px 12px rgba(239, 68, 68, 0.15)'
          : '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: error
            ? '0 6px 16px rgba(239, 68, 68, 0.25)'
            : '0 4px 16px rgba(37, 99, 235, 0.15)',
          borderColor: error ? 'error.dark' : 'primary.main',
        },
      }}
    >
      {/* Field Selector */}
      <FormControl
        size="small"
        sx={{
          minWidth: 180,
          '& .MuiOutlinedInput-root': {
            fontWeight: 600,
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
            '&:hover': {
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
            },
          },
        }}
      >
        <Select value={condition.field} onChange={handleFieldChange}>
          {fields.map((field) => (
            <MenuItem key={field.key} value={field.key}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Operator Selector */}
      <FormControl
        size="small"
        sx={{
          minWidth: 150,
          '& .MuiOutlinedInput-root': {
            fontWeight: 500,
            backgroundColor: 'rgba(139, 92, 246, 0.04)',
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.08)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
            },
          },
        }}
      >
        <Select value={condition.operator} onChange={handleOperatorChange}>
          {availableOperators.map((op) => (
            <MenuItem key={op.value} value={op.value}>
              {op.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Value Input */}
      <Box sx={{ flex: 1, minWidth: 200 }}>{renderValueInput()}</Box>

      {/* Remove Button */}
      <IconButton
        onClick={onRemove}
        size="small"
        sx={{
          mt: 0.5,
          color: 'error.main',
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          '&:hover': {
            backgroundColor: 'error.main',
            color: 'white',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s ease',
        }}
        aria-label="Remove filter"
      >
        <Trash2 size={18} />
      </IconButton>
    </Box>
  );
}
