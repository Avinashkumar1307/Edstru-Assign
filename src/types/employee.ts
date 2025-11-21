/**
 * Employee data structure representing the core data model
 */
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
  skills: string[];
  address: {
    city: string;
    state: string;
    country: string;
  };
  projects: number;
  lastReview: string;
  performanceRating: number;
}

/**
 * Represents a flattened field path for nested objects
 * e.g., "address.city" for nested properties
 */
export type EmployeeFieldPath =
  | keyof Employee
  | 'address.city'
  | 'address.state'
  | 'address.country';
