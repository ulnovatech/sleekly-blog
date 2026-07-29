import { Box, Button, Stack } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  
  let visiblePages = pages;
  if (pages.length > maxVisiblePages) {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    visiblePages = pages.slice(
      Math.max(0, endPage - maxVisiblePages + 1),
      Math.min(pages.length, startPage + maxVisiblePages - 1)
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        {/* Previous Button */}
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          startIcon={<NavigateBeforeIcon />}
          sx={{
            color: currentPage === 1 ? "#ccc" : "#1976d2",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            "&:hover:not(:disabled)": {
              backgroundColor: "#e3f2fd",
            },
          }}
        >
          Previous
        </Button>

        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={page === currentPage ? "contained" : "outlined"}
            sx={{
              minWidth: "40px",
              height: "40px",
              p: 0,
              borderRadius: "8px",
              fontWeight: 600,
              background:
                page === currentPage
                  ? "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)"
                  : "transparent",
              color: page === currentPage ? "white" : "#1976d2",
              borderColor: "#e0e0e0",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: page === currentPage ? "#1565c0" : "#e3f2fd",
              },
            }}
          >
            {page}
          </Button>
        ))}

        {/* Next Button */}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          endIcon={<NavigateNextIcon />}
          sx={{
            color: currentPage === totalPages ? "#ccc" : "#1976d2",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            "&:hover:not(:disabled)": {
              backgroundColor: "#e3f2fd",
            },
          }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}