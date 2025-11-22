import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import { Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type {
  FilterCondition as FilterConditionType,
  FilterValidationError,
} from '../types';
import { FIELD_OPERATORS } from '../types';
import { generateFilterId, validateFilterValue } from '../utils/filterUtils';
import { FilterCondition } from './FilterCondition';
import { fieldDefinitions } from '../data/fieldDefinitions';

interface FilterBuilderProps {
  onFiltersChange: (filters: FilterConditionType[]) => void;
  initialFilters?: FilterConditionType[];
}

/**
 * FilterBuilder component - main container for managing filter conditions
 * Handles adding, removing, and validating filters
 * src/components/FilterBuilder.tsx
 */
export function FilterBuilder({ onFiltersChange, initialFilters = [] }: FilterBuilderProps) {
  const [conditions, setConditions] = useState<FilterConditionType[]>(initialFilters);
  const [errors, setErrors] = useState<FilterValidationError[]>([]);

  /**
   * Sync conditions with initialFilters when they change
   */
  useEffect(() => {
    setConditions(initialFilters);
  }, [initialFilters]);

  /**
   * Create a new filter condition with default values
   */
  const createNewCondition = (): FilterConditionType => {
    const firstField = fieldDefinitions[0];
    const firstOperator = FIELD_OPERATORS[firstField.type][0].value;

    return {
      id: generateFilterId(),
      field: firstField.key,
      operator: firstOperator,
      value: getDefaultValue(firstField.type),
    };
  };

  /**
   * Get default value based on field type
   */
  const getDefaultValue = (fieldType: string) => {
    switch (fieldType) {
      case 'boolean':
        return false;
      case 'multi-select':
        return [];
      case 'number':
      case 'amount':
        return 0;
      default:
        return '';
    }
  };

  /**
   * Add a new filter condition
   */
  const handleAddFilter = () => {
    const newCondition = createNewCondition();
    const updatedConditions = [...conditions, newCondition];
    setConditions(updatedConditions);
  };

  /**
   * Remove a filter condition
   */
  const handleRemoveFilter = (id: string) => {
    const updatedConditions = conditions.filter((c) => c.id !== id);
    setConditions(updatedConditions);
    setErrors(errors.filter((e) => e.filterId !== id));
    onFiltersChange(updatedConditions);
  };

  /**
   * Update a filter condition
   */
  const handleUpdateFilter = (updatedCondition: FilterConditionType) => {
    const updatedConditions = conditions.map((c) =>
      c.id === updatedCondition.id ? updatedCondition : c
    );
    setConditions(updatedConditions);
  };

  /**
   * Clear all filters
   */
  const handleClearAll = () => {
    setConditions([]);
    setErrors([]);
    onFiltersChange([]);
  };

  /**
   * Validate all filters and apply them
   */
  const handleApplyFilters = () => {
    const validationErrors: FilterValidationError[] = [];

    conditions.forEach((condition) => {
      const fieldDef = fieldDefinitions.find((f) => f.key === condition.field);
      if (fieldDef) {
        const error = validateFilterValue(condition, fieldDef);
        if (error) {
          validationErrors.push({
            filterId: condition.id,
            message: error,
          });
        }
      }
    });

    setErrors(validationErrors);

    // Only apply filters if there are no validation errors
    if (validationErrors.length === 0) {
      onFiltersChange(conditions);
    }
  };

  /**
   * Get error message for a specific filter
   */
  const getErrorForFilter = (filterId: string): string | undefined => {
    return errors.find((e) => e.filterId === filterId)?.message;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Compact Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2.5,
          pb: 2,
          borderBottom: '2px solid',
          borderColor: 'rgba(0, 0, 0, 0.06)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            }}
          >
            <Plus size={20} color="white" strokeWidth={3} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'primary.main',
                lineHeight: 1.2,
              }}
            >
              Filter Builder
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              {conditions.length === 0
                ? 'Add filters to refine your search'
                : `${conditions.length} active filter${conditions.length > 1 ? 's' : ''}`}
            </Typography>
          </Box>
        </Box>
        {conditions.length > 0 && (
          <Button
            startIcon={<X size={16} />}
            onClick={handleClearAll}
            variant="outlined"
            size="small"
            sx={{
              borderColor: 'error.main',
              color: 'error.main',
              fontWeight: 600,
              height: 36,
              '&:hover': {
                borderColor: 'error.dark',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
              },
            }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Filter Conditions */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        {conditions.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              border: '2px dashed',
              borderColor: 'primary.light',
              borderRadius: 2,
              backgroundColor: 'rgba(37, 99, 235, 0.03)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(37, 99, 235, 0.06)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid',
                  borderColor: 'primary.light',
                }}
              >
                <Plus size={24} color="#2563eb" strokeWidth={2.5} />
              </Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.25 }}>
                  No filters applied
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  Click "Add Filter" below to start filtering
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          conditions.map((condition, index) => (
            <Box
              key={condition.id}
              sx={{
                animation: 'fadeIn 0.3s ease-in',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(-10px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              {index > 0 && (
                <Box
                  sx={{
                    textAlign: 'center',
                    my: 1,
                  }}
                >
                  <Chip
                    label="AND"
                    size="small"
                    sx={{
                      fontWeight: 700,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                </Box>
              )}
              <FilterCondition
                condition={condition}
                fields={fieldDefinitions}
                onUpdate={handleUpdateFilter}
                onRemove={() => handleRemoveFilter(condition.id)}
                error={getErrorForFilter(condition.id)}
              />
            </Box>
          ))
        )}
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          pt: 2.5,
          mt: 2.5,
          borderTop: '2px solid',
          borderColor: 'rgba(0, 0, 0, 0.06)',
        }}
      >
        <Button
          startIcon={<Plus size={18} />}
          onClick={handleAddFilter}
          variant="outlined"
          size="medium"
          aria-label="Add new filter condition"
          sx={{
            flex: 1,
            fontWeight: 600,
            borderWidth: 2,
            height: 44,
            fontSize: '0.95rem',
            '&:hover': {
              borderWidth: 2,
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Add Filter
        </Button>
        {conditions.length > 0 && (
          <Button
            onClick={handleApplyFilters}
            variant="contained"
            size="medium"
            aria-label={`Apply ${conditions.length} filter${conditions.length > 1 ? 's' : ''}`}
            sx={{
              flex: 1,
              fontWeight: 600,
              height: 44,
              fontSize: '0.95rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(37, 99, 235, 0.6)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Apply Filters ({conditions.length})
          </Button>
        )}
      </Box>

      {/* Error Summary */}
      {errors.length > 0 && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            backgroundColor: 'error.light',
            borderRadius: 2,
            border: '2px solid',
            borderColor: 'error.main',
            animation: 'shake 0.5s ease',
            '@keyframes shake': {
              '0%, 100%': { transform: 'translateX(0)' },
              '25%': { transform: 'translateX(-10px)' },
              '75%': { transform: 'translateX(10px)' },
            },
          }}
        >
          <Typography variant="subtitle1" color="error.dark" fontWeight="bold" sx={{ mb: 1 }}>
            ⚠️ Please fix the following errors:
          </Typography>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            {errors.map((error) => (
              <li key={error.filterId}>
                <Typography variant="body2" color="error.dark" sx={{ fontWeight: 500 }}>
                  {error.message}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Paper>
  );
}
