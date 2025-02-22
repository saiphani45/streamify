import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

interface TableProps {
  data: any[];
  columns: Column[];
  itemsPerPage?: number;
  className?: string;
  showFilters?: boolean;
  filterPlaceholder?: string;
}

const GenericTable = ({
  data,
  columns,
  itemsPerPage = 10,
  className = "",
  showFilters = true,
  filterPlaceholder = "Filter...",
}: TableProps) => {
  // State for sorting and filtering
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Handle sorting
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  // Filter data
  const filteredData = data.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      const cellValue = row[key]?.toString().toLowerCase() ?? "";
      return cellValue.includes(value.toLowerCase());
    });
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-4 mb-4">
          {columns
            .filter((col) => col.filterable)
            .map((column) => (
              <Input
                key={column.key}
                placeholder={`Filter by ${column.header.toLowerCase()}...`}
                value={filters[column.key] || ""}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    [column.key]: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="w-full sm:w-48 bg-white/50 dark:bg-slate-900/50 border-sky-100 
                dark:border-sky-900/50 focus:border-sky-200 dark:focus:border-sky-800"
              />
            ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className={`w-full ${className}`}>
          <thead>
            <tr className="border-b border-sky-200 dark:border-sky-800">
              {columns.map((column) => (
                <th key={column.key} className="text-left py-3 px-4">
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      className="h-8 flex items-center gap-2 text-slate-700 dark:text-slate-200 
                        hover:text-sky-600 dark:hover:text-sky-400"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.header}
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-sky-100 dark:border-sky-900/50 
                  hover:bg-sky-50/50 dark:hover:bg-sky-900/20"
              >
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-sky-600/60 dark:text-sky-400/60">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50
              disabled:opacity-50"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              const nearCurrent = Math.abs(page - currentPage) <= 1;
              return page === 1 || page === totalPages || nearCurrent;
            })
            .map((page, i, filteredPages) => (
              <React.Fragment key={page}>
                {i > 0 && filteredPages[i - 1] !== page - 1 && (
                  <span className="px-2 py-1 text-sky-600 dark:text-sky-400">
                    ...
                  </span>
                )}
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white"
                      : "border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50"
                  }
                >
                  {page}
                </Button>
              </React.Fragment>
            ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/50
              disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenericTable;
