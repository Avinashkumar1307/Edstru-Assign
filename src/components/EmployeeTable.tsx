import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import type { Employee } from '../types';
import { ExportMenu } from './ExportMenu';

interface EmployeeTableProps {
  employees: Employee[];
  totalCount: number;
}

type SortField = keyof Employee | 'address.city' | 'address.state';
type SortOrder = 'asc' | 'desc';

/**
 * EmployeeTable component - displays employee data with sorting
 * Shows filtered results with real-time updates
 * src/components/EmployeeTable.tsx
 */
export function EmployeeTable({ employees, totalCount }: EmployeeTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  /**
   * Handle sorting when column header is clicked
   */
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle sort order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortOrder('asc');
    }
  };

  /**
   * Get nested value for sorting
   */
  const getNestedValue = (employee: Employee, field: SortField): any => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      return (employee as any)[parent]?.[child];
    }
    return employee[field as keyof Employee];
  };

  /**
   * Sort employees based on current sort field and order
   */
  const sortedEmployees = [...employees].sort((a, b) => {
    const aValue = getNestedValue(a, sortField);
    const bValue = getNestedValue(b, sortField);

    // Handle array values (like skills)
    if (Array.isArray(aValue)) {
      return 0;
    }

    // Handle different data types
    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  /**
   * Format currency values
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  /**
   * Format date values
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Render sortable table header
   */
  const SortableHeader = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <TableCell>
      <TableSortLabel
        active={sortField === field}
        direction={sortField === field ? sortOrder : 'asc'}
        onClick={() => handleSort(field)}
      >
        <strong>{label}</strong>
      </TableSortLabel>
    </TableCell>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Results Summary */}
      <Box
        sx={{
          p: 3,
          borderBottom: '2px solid',
          borderColor: 'rgba(0, 0, 0, 0.06)',
          background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
              Employee Results
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Showing <strong style={{ color: '#2563eb' }}>{employees.length}</strong> of{' '}
              <strong style={{ color: '#2563eb' }}>{totalCount}</strong> employees
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {employees.length > 0 && (
              <>
                <Chip
                  label={`${((employees.length / totalCount) * 100).toFixed(1)}% Match`}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    height: 32,
                  }}
                />
                <ExportMenu employees={employees} />
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'primary.dark',
                  borderBottom: '2px solid',
                  borderColor: 'primary.light',
                  py: 2,
                },
              }}
            >
              <SortableHeader field="name" label="Name" />
              <SortableHeader field="email" label="Email" />
              <SortableHeader field="department" label="Department" />
              <SortableHeader field="role" label="Role" />
              <SortableHeader field="salary" label="Salary" />
              <SortableHeader field="joinDate" label="Join Date" />
              <TableCell>
                <strong>Skills</strong>
              </TableCell>
              <SortableHeader field="address.city" label="City" />
              <SortableHeader field="isActive" label="Active" />
              <SortableHeader field="projects" label="Projects" />
              <SortableHeader field="performanceRating" label="Rating" />
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  align="center"
                  sx={{
                    py: 10,
                    backgroundColor: 'rgba(37, 99, 235, 0.02)',
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      opacity: 0.2,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ fontSize: '2rem', fontWeight: 'bold' }}
                    >
                      ∅
                    </Box>
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
                    No results found
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Try adjusting your filters to find what you're looking for
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedEmployees.map((employee, index) => (
                <TableRow
                  key={employee.id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.05)',
                      transform: 'scale(1.001)',
                    },
                    '& td': {
                      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                      py: 2,
                    },
                    backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {employee.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                      {employee.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={employee.department}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {employee.role}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {formatCurrency(employee.salary)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                      {formatDate(employee.joinDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 200 }}>
                      {employee.skills.slice(0, 3).map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: 'secondary.light',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                      ))}
                      {employee.skills.length > 3 && (
                        <Chip
                          label={`+${employee.skills.length - 3}`}
                          size="small"
                          sx={{
                            borderColor: 'secondary.main',
                            color: 'secondary.main',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                        }}
                      />
                      <Typography variant="body2">
                        {employee.address.city}, {employee.address.state}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={employee.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      sx={{
                        backgroundColor: employee.isActive ? 'success.main' : 'rgba(0, 0, 0, 0.12)',
                        color: employee.isActive ? 'white' : 'text.secondary',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 32,
                        height: 32,
                        borderRadius: '8px',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                      }}
                    >
                      {employee.projects}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {employee.performanceRating.toFixed(1)}
                      </Typography>
                      <Box
                        component="span"
                        sx={{
                          color: employee.performanceRating >= 4.5 ? 'warning.main' : 'text.secondary',
                          fontSize: '1rem',
                        }}
                      >
                        ★
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
