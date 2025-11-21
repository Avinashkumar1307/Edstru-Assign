import { Box, FormControl, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface SingleSelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: boolean;
  helperText?: string;
}

/**
 * Single select dropdown component
 */
export function SingleSelectInput({
  value,
  onChange,
  options,
  error,
  helperText,
}: SingleSelectInputProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      <Select
        value={value || ''}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select an option...
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <Box sx={{ fontSize: '0.75rem', color: 'error.main', mt: 0.5, ml: 1.75 }}>
          {helperText}
        </Box>
      )}
    </FormControl>
  );
}
