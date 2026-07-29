import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch}>
      <TextField
        fullWidth
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <Button
                size="small"
                onClick={handleClear}
                sx={{ minWidth: "auto" }}
              >
                <ClearIcon />
              </Button>
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
      />
    </form>
  );
}