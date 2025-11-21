import { Box, FormControlLabel, Switch } from '@mui/material';

interface BooleanInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
  error?: boolean;
  helperText?: string;
}

/**
 * Boolean input component with toggle switch
 */
export function BooleanInput({
  value,
  onChange,
  error,
  helperText,
}: BooleanInputProps) {
  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        }
        label={value ? 'True' : 'False'}
      />
      {helperText && error && (
        <Box sx={{ fontSize: '0.75rem', color: 'error.main', mt: 0.5, ml: 1.75 }}>
          {helperText}
        </Box>
      )}
    </Box>
  );
}
