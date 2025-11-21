import { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Download, FileText, FileJson } from 'lucide-react';
import type { Employee } from '../types';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

interface ExportMenuProps {
  employees: Employee[];
}

/**
 * Export menu component with CSV and JSON options
 */
export function ExportMenu({ employees }: ExportMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportCSV = () => {
    exportToCSV(employees, `employees-export-${new Date().toISOString().split('T')[0]}.csv`);
    handleClose();
  };

  const handleExportJSON = () => {
    exportToJSON(employees, `employees-export-${new Date().toISOString().split('T')[0]}.json`);
    handleClose();
  };

  return (
    <>
      <Button
        startIcon={<Download size={18} />}
        onClick={handleClick}
        variant="outlined"
        size="small"
        disabled={employees.length === 0}
        sx={{
          fontWeight: 600,
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        }}
        aria-label="Export data"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Export ({employees.length})
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-label': 'Export options',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleExportCSV}>
          <ListItemIcon>
            <FileText size={18} />
          </ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExportJSON}>
          <ListItemIcon>
            <FileJson size={18} />
          </ListItemIcon>
          <ListItemText>Export as JSON</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
