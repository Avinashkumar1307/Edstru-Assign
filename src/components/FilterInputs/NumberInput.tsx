import { TextField } from '@mui/material';

interface NumberInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

/**
 * Number input component for number filter operators
 */
export function NumberInput({
  value,
  onChange,
  placeholder = 'Enter number...',
  error,
  helperText,
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange(null);
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  return (
    <TextField
      size="small"
      fullWidth
      type="number"
      value={value ?? ''}
      onChange={handleChange}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      variant="outlined"
    />
  );
}
