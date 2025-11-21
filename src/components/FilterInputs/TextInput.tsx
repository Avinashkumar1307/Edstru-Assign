import { TextField } from '@mui/material';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

/**
 * Text input component for text filter operators
 */
export function TextInput({
  value,
  onChange,
  placeholder = 'Enter text...',
  error,
  helperText,
}: TextInputProps) {
  return (
    <TextField
      size="small"
      fullWidth
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      variant="outlined"
    />
  );
}
