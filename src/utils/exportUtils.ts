import type { Employee } from '../types';

/**
 * Export employee data to CSV format
 */
export function exportToCSV(employees: Employee[], filename = 'employees.csv') {
  if (employees.length === 0) {
    alert('No data to export');
    return;
  }

  // Define CSV headers
  const headers = [
    'ID',
    'Name',
    'Email',
    'Department',
    'Role',
    'Salary',
    'Join Date',
    'Active',
    'Skills',
    'City',
    'State',
    'Country',
    'Projects',
    'Last Review',
    'Performance Rating',
  ];

  // Convert employees to CSV rows
  const rows = employees.map((emp) => [
    emp.id,
    emp.name,
    emp.email,
    emp.department,
    emp.role,
    emp.salary,
    emp.joinDate,
    emp.isActive ? 'Yes' : 'No',
    emp.skills.join('; '),
    emp.address.city,
    emp.address.state,
    emp.address.country,
    emp.projects,
    emp.lastReview,
    emp.performanceRating,
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((cell) => {
          // Escape commas and quotes
          const cellStr = String(cell);
          if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        })
        .join(',')
    ),
  ].join('\n');

  // Create and download file
  downloadFile(csvContent, filename, 'text/csv');
}

/**
 * Export employee data to JSON format
 */
export function exportToJSON(employees: Employee[], filename = 'employees.json') {
  if (employees.length === 0) {
    alert('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(employees, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
}

/**
 * Helper function to trigger file download
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export filters to JSON for sharing/backup
 */
export function exportFiltersToJSON(filters: any[], filename = 'filters.json') {
  if (filters.length === 0) {
    alert('No filters to export');
    return;
  }

  const jsonContent = JSON.stringify(filters, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
}
