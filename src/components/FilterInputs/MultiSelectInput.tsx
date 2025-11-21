import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface MultiSelectInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  error?: boolean;
  helperText?: string;
}

/**
 * Multi-select dropdown component with checkboxes
 */
export function MultiSelectInput({
  value,
  onChange,
  options,
  error,
  helperText,
}: MultiSelectInputProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value;
    onChange(typeof selected === 'string' ? selected.split(',') : selected);
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      <Select
        multiple
        value={value || []}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((val) => (
              <Chip key={val} label={val} size="small" />
            ))}
          </Box>
        )}
        displayEmpty
      >
        <MenuItem disabled value="">
          <em>Select options...</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={value?.includes(option) || false} />
            <ListItemText primary={option} />
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
