import { useState, useEffect } from "react";
import { Container, CssBaseline, Box, Typography, Chip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Filter } from "lucide-react";
import { FilterBuilder } from "./components/FilterBuilder";
import { EmployeeTable } from "./components/EmployeeTable";
import { Toast } from "./components/Toast";
import { mockEmployees } from "./data/mockEmployees";
import type { FilterCondition } from "./types";
import { applyFilters } from "./utils/filterUtils";
import { useFilterPersistence } from "./hooks/useFilterPersistence";

/**
 * Main App component
 * Orchestrates the filter builder and employee table components
 * Manages filter state and applies client-side filtering
 */
function App() {
  const { filters: persistedFilters, setFilters: setPersistFilters } = useFilterPersistence();
  const [activeFilters, setActiveFilters] = useState<FilterCondition[]>(persistedFilters);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' as 'success' | 'info' | 'warning' | 'error' });

  // Update persistence when filters change
  useEffect(() => {
    setPersistFilters(activeFilters);
    if (activeFilters.length > 0) {
      setToast({ open: true, message: 'Filters saved automatically', severity: 'success' });
    }
  }, [activeFilters, setPersistFilters]);

  // Apply filters to employee data
  const filteredEmployees = applyFilters(mockEmployees, activeFilters);

  // Enhanced Material UI theme with custom colors
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#2563eb",
        light: "#3b82f6",
        dark: "#1d4ed8",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#8b5cf6",
        light: "#a78bfa",
        dark: "#7c3aed",
      },
      success: {
        main: "#10b981",
        light: "#34d399",
      },
      error: {
        main: "#ef4444",
        light: "#f87171",
      },
      background: {
        default: "#f8fafc",
        paper: "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h3: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      "none",
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    ],
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Gradient Background */}
        <Box
          sx={{
            minHeight: "100vh",
            minWidth: "100vw",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            pb: 6,
          }}
        >
          {/* Full Width Header */}
          <Box
            sx={{
              width: "100%",
              background:
                "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              mb: 4,
            }}
          >
            <Container maxWidth="xl">
              <Box
                sx={{
                  py: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 3,
                  flexWrap: "wrap",
                }}
              >
                {/* Left: Title and Icon */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 56,
                      height: 56,
                      borderRadius: "14px",
                      background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <Filter size={28} strokeWidth={2.5} color="white" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        color: "white",
                        fontWeight: 800,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        lineHeight: 1.2,
                        mb: 0.5,
                      }}
                    >
                      Dynamic Filter System
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      }}
                    >
                      Advanced employee data filtering with real-time table
                      updates
                    </Typography>
                  </Box>
                </Box>

                {/* Right: Stats Chips */}
                <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                  <Chip
                    label={`${mockEmployees.length} Total`}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      backdropFilter: "blur(10px)",
                      color: "white",
                      fontWeight: 700,
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      height: 36,
                      fontSize: "0.875rem",
                    }}
                  />
                  <Chip
                    label={`${activeFilters.length} Filters`}
                    sx={{
                      backgroundColor:
                        activeFilters.length > 0
                          ? "rgba(255, 255, 255, 0.35)"
                          : "rgba(255, 255, 255, 0.25)",
                      backdropFilter: "blur(10px)",
                      color: "white",
                      fontWeight: 700,
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      height: 36,
                      fontSize: "0.875rem",
                    }}
                  />
                  <Chip
                    label={`${filteredEmployees.length} Results`}
                    sx={{
                      backgroundColor: "rgba(16, 185, 129, 0.3)",
                      backdropFilter: "blur(10px)",
                      color: "white",
                      fontWeight: 700,
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      height: 36,
                      fontSize: "0.875rem",
                    }}
                  />
                </Box>
              </Box>
            </Container>
          </Box>

          <Container maxWidth="xl">
            {/* Filter Builder */}
            <FilterBuilder onFiltersChange={setActiveFilters} initialFilters={activeFilters} />

            {/* Employee Table */}
            <EmployeeTable
              employees={filteredEmployees}
              totalCount={mockEmployees.length}
            />
          </Container>
        </Box>

        {/* Toast Notifications */}
        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
