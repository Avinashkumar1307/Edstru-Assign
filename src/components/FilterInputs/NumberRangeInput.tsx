import { Box, TextField } from '@mui/material';

interface NumberRangeInputProps {
  value: { min: number; max: number } | null;
  onChange: (value: { min: number; max: number }) => void;
  error?: boolean;
  helperText?: string;
  isAmount?: boolean;
}

/**
 * Number range input component for "between" operators
 * Used for both regular numbers and amounts/currency
 */
export function NumberRangeInput({
  value,
  onChange,
  error,
  helperText,
  isAmount = false,
}: NumberRangeInputProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const min = val === '' ? 0 : parseFloat(val);
    if (!isNaN(min)) {
      onChange({ min, max: value?.max ?? 0 });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const max = val === '' ? 0 : parseFloat(val);
    if (!isNaN(max)) {
      onChange({ min: value?.min ?? 0, max });
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField
        size="small"
        type="number"
        value={value?.min ?? ''}
        onChange={handleMinChange}
        placeholder={isAmount ? 'Min amount' : 'Min'}
        error={error}
        variant="outlined"
        sx={{ flex: 1 }}
        inputProps={{ step: isAmount ? 1000 : 1 }}
      />
      <Box sx={{ color: 'text.secondary' }}>to</Box>
      <TextField
        size="small"
        type="number"
        value={value?.max ?? ''}
        onChange={handleMaxChange}
        placeholder={isAmount ? 'Max amount' : 'Max'}
        error={error}
        helperText={helperText}
        variant="outlined"
        sx={{ flex: 1 }}
        inputProps={{ step: isAmount ? 1000 : 1 }}
      />
    </Box>
  );
}
