# Dynamic Filter Component System

A production-ready, type-safe dynamic filter system for React applications with TypeScript. This system provides a reusable, modular architecture for filtering complex datasets with multiple data types and operators.

## Overview

This project demonstrates advanced React and TypeScript skills through a comprehensive filter component system that can be integrated with any data table. It features:

- **Type-Safe Architecture**: Full TypeScript coverage with strict type checking
- **Multi-Type Support**: Handles text, numbers, dates, amounts, single/multi-select, and boolean fields
- **Dynamic Operators**: Context-aware operators based on field types
- **Real-Time Filtering**: Instant table updates with client-side filtering algorithms
- **Validation**: Built-in validation for filter conditions with error handling
- **Modular Design**: Reusable components that can work independently

## ✨ What's New - Enhanced UI

The application now features a **completely redesigned, modern UI** with:

- 🎨 **Beautiful Gradient Background**: Purple gradient creating depth and visual appeal
- 🎯 **Glassmorphism Effects**: Frosted glass cards with backdrop blur
- 💎 **Polished Components**: Enhanced filter cards with shadows and animations
- 📊 **Modern Table Design**: Color-coded chips, status badges, and rating indicators
- 🎭 **Visual Feedback**: Hover effects, transitions, and smooth animations
- 🌈 **Custom Theme**: Professional blue/purple color palette
- 📱 **Responsive Design**: Works beautifully on all screen sizes
- ♿ **Accessible**: WCAG 2.1 compliant with proper contrast ratios

See [UI_ENHANCEMENTS.md](./UI_ENHANCEMENTS.md) for complete details on all visual improvements.

## 🚀 Bonus Features

The application now includes powerful advanced features:

- 💾 **Filter Persistence**: Filters automatically save to localStorage and restore on page reload
- 📥 **Data Export**: Export filtered results to CSV or JSON with one click
- 🔍 **Regex Operator**: Advanced text pattern matching with regular expressions
- ⚡ **Debounced Updates**: Custom hook for performance optimization (ready to integrate)
- ♿ **Enhanced Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- 🔔 **Toast Notifications**: User-friendly notifications for system actions

See [BONUS_FEATURES.md](./BONUS_FEATURES.md) for comprehensive documentation, usage examples, and testing guides.

## Features

### Supported Filter Types

| Data Type | Operators | Input Component |
|-----------|-----------|-----------------|
| Text | Equals, Contains, Starts With, Ends With, Does Not Contain, Regex Match | Text Input |
| Number | Equals, Greater Than, Less Than, Greater/Less Than or Equal, Between | Number Input / Range |
| Date | Between | Date Range Picker |
| Amount/Currency | Between | Number Range with formatting |
| Single Select | Is, Is Not | Dropdown |
| Multi-Select | In, Not In | Multi-select with checkboxes |
| Boolean | Is | Toggle Switch |

### Key Features

- ✅ **60+ Mock Employee Records** with diverse data types
- ✅ **Dynamic Filter Builder** with add/remove functionality
- ✅ **Client-Side Filtering** with optimized algorithms
- ✅ **Sortable Table** with real-time updates
- ✅ **Nested Object Support** (e.g., address.city filtering)
- ✅ **Array Filtering** for multi-select fields
- ✅ **Validation & Error Handling** throughout the system
- ✅ **Material UI Design** with responsive layout
- ✅ **Type-Safe Components** with comprehensive TypeScript interfaces
- ✅ **Filter Persistence** with automatic localStorage integration
- ✅ **CSV/JSON Export** for filtered data
- ✅ **Advanced Regex Operator** for complex text matching
- ✅ **Toast Notifications** for user feedback
- ✅ **ARIA Accessibility** labels and keyboard navigation

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and dev server
- **Material UI** - Component library and styling
- **Material UI X Date Pickers** - Date range selection
- **Lucide React** - Icon library
- **Day.js** - Date manipulation

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Edstru-Assign
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/           # React components
│   ├── FilterInputs/    # Field-specific input components
│   │   ├── TextInput.tsx
│   │   ├── NumberInput.tsx
│   │   ├── NumberRangeInput.tsx
│   │   ├── DateRangeInput.tsx
│   │   ├── SingleSelectInput.tsx
│   │   ├── MultiSelectInput.tsx
│   │   └── BooleanInput.tsx
│   ├── FilterCondition.tsx    # Single filter row component
│   ├── FilterBuilder.tsx      # Main filter management component
│   └── EmployeeTable.tsx      # Data table with sorting
├── data/                # Mock data and configurations
│   ├── mockEmployees.ts       # 60 employee records
│   └── fieldDefinitions.ts    # Field type mappings
├── types/               # TypeScript definitions
│   ├── employee.ts            # Employee data types
│   ├── field.ts               # Field and operator types
│   ├── filter.ts              # Filter condition types
│   └── index.ts               # Type exports
├── utils/               # Utility functions
│   └── filterUtils.ts         # Filtering algorithms
└── App.tsx              # Main application component
```

## Architecture

### Component Hierarchy

```
App
├── FilterBuilder
│   └── FilterCondition (multiple)
│       ├── Field Selector
│       ├── Operator Selector
│       └── Value Input (dynamic based on field type)
└── EmployeeTable
    ├── Table Header (sortable columns)
    └── Table Body (filtered data)
```

### Data Flow

1. **Filter Creation**: User adds filter conditions through FilterBuilder
2. **Validation**: Filter values are validated against field types
3. **Application**: Valid filters are passed to App component
4. **Filtering**: Client-side algorithms process the dataset
5. **Display**: EmployeeTable updates in real-time with filtered results

### Type System

The project uses a comprehensive type system:

- **Employee**: Core data model with nested objects and arrays
- **FieldDefinition**: Maps fields to their types and available options
- **FilterCondition**: Represents a single filter with field, operator, and value
- **OperatorType**: Union type of all available operators
- **FilterValue**: Flexible type supporting strings, numbers, arrays, and ranges

## Usage Examples

### Basic Text Filter

Filter employees by name containing "John":
- Field: Name
- Operator: Contains
- Value: "John"

### Salary Range Filter

Find employees with salary between $80,000 and $120,000:
- Field: Salary
- Operator: Between
- Value: Min: 80000, Max: 120000

### Multi-Select Skills Filter

Find employees with React or TypeScript skills:
- Field: Skills
- Operator: In
- Value: ["React", "TypeScript"]

### Date Range Filter

Find employees who joined in 2021:
- Field: Join Date
- Operator: Between
- Value: Start: 2021-01-01, End: 2021-12-31

### Nested Object Filter

Filter by city:
- Field: City (address.city)
- Operator: Is
- Value: "San Francisco"

## Filtering Algorithms

The system implements efficient client-side filtering:

- **Text Matching**: Case-insensitive string operations
- **Numeric Comparisons**: Standard mathematical operators
- **Date Ranges**: ISO date string parsing and comparison
- **Array Operations**: Intersection checks for multi-select
- **Nested Objects**: Dot notation property access
- **Boolean Logic**: AND between different fields

## Component API

### FilterBuilder

```typescript
interface FilterBuilderProps {
  onFiltersChange: (filters: FilterCondition[]) => void;
}
```

### FilterCondition

```typescript
interface FilterConditionProps {
  condition: FilterCondition;
  fields: FieldDefinition[];
  onUpdate: (condition: FilterCondition) => void;
  onRemove: () => void;
  error?: string;
}
```

### EmployeeTable

```typescript
interface EmployeeTableProps {
  employees: Employee[];
  totalCount: number;
}
```

## Extending the System

### Adding a New Field Type

1. Add the field type to `src/types/field.ts`
2. Define operators in `FIELD_OPERATORS` map
3. Create input component in `src/components/FilterInputs/`
4. Update `FilterCondition.tsx` to render the new input
5. Implement filtering logic in `src/utils/filterUtils.ts`

### Adding a New Field

1. Update `Employee` interface in `src/types/employee.ts`
2. Add field to mock data in `src/data/mockEmployees.ts`
3. Define field in `src/data/fieldDefinitions.ts`
4. Add column to `EmployeeTable.tsx`

## Performance Considerations

- **Efficient Filtering**: O(n*m) complexity where n = records, m = conditions
- **Memoization**: Could be added for expensive filter operations
- **Virtual Scrolling**: Can be implemented for large datasets (1000+ records)
- **Debouncing**: Filter application uses button click (no auto-debouncing needed)

## Testing Recommendations

### Unit Tests
- Filter utility functions (text matching, number comparisons, date ranges)
- Validation logic for different field types
- Nested object access functions

### Integration Tests
- Filter condition updates
- Multiple filter application
- Error handling and validation

### E2E Tests
- Complete filter workflows
- Table sorting and filtering combined
- Edge cases (empty results, invalid inputs)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of a technical assessment and is provided as-is for evaluation purposes.

## Contact

For questions or feedback about this implementation, please refer to the project documentation or contact the development team.
