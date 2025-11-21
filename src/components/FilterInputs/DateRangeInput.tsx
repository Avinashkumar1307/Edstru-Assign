import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface DateRangeInputProps {
  value: { start: string; end: string } | null;
  onChange: (value: { start: string; end: string }) => void;
  error?: boolean;
  helperText?: string;
}

/**
 * Date range input component with calendar pickers
 */
export function DateRangeInput({
  value,
  onChange,
  error,
  helperText,
}: DateRangeInputProps) {
  const handleStartChange = (date: Dayjs | null) => {
    if (date) {
      onChange({
        start: date.format('YYYY-MM-DD'),
        end: value?.end || dayjs().format('YYYY-MM-DD'),
      });
    }
  };

  const handleEndChange = (date: Dayjs | null) => {
    if (date) {
      onChange({
        start: value?.start || dayjs().format('YYYY-MM-DD'),
        end: date.format('YYYY-MM-DD'),
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <DatePicker
          label="Start Date"
          value={value?.start ? dayjs(value.start) : null}
          onChange={handleStartChange}
          slotProps={{
            textField: {
              size: 'small',
              error,
              sx: { flex: 1 },
            },
          }}
        />
        <Box sx={{ color: 'text.secondary' }}>to</Box>
        <DatePicker
          label="End Date"
          value={value?.end ? dayjs(value.end) : null}
          onChange={handleEndChange}
          slotProps={{
            textField: {
              size: 'small',
              error,
              helperText,
              sx: { flex: 1 },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
