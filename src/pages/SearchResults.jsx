import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../site.config";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { posts, loading } = useContext(BlogContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!loading && query) {
      const filtered = posts.filter(
        (post) =>
          post.frontmatter?.title?.toLowerCase().includes(query.toLowerCase()) ||
          post.frontmatter?.description?.toLowerCase().includes(query.toLowerCase()) ||
          post.frontmatter?.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    }
  }, [query, posts, loading]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Search — {siteConfig.blogName}</title>
        <meta
          name="description"
          content={`Search results for "${query}" on ${siteConfig.blogName}`}
        />
      </Helmet>

      <Box sx={{ width: "100%" }}>
        {/* Header */}
        <Box sx={{ mb: 6, display: "flex", alignItems: "center", gap: 2 }}>
          <SearchIcon sx={{ fontSize: "2.5rem", color: "#1976d2" }} />
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#212121",
              }}
            >
              Search Results
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#757575",
              }}
            >
              {results.length} {results.length === 1 ? "result" : "results"} found for "
              <strong>{query}</strong>"
            </Typography>
          </Box>
        </Box>

        {/* Results */}
        {results.length > 0 ? (
          <Grid container spacing={3}>
            {results.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.slug}>
                <BlogCard slug={post.slug} frontmatter={post.frontmatter} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "#f5f5f5",
              borderRadius: "12px",
              p: 4,
            }}
          >
            <SearchIcon
              sx={{
                fontSize: "3rem",
                color: "#ccc",
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#757575",
                mb: 1,
              }}
            >
              No Results Found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#9e9e9e",
              }}
            >
              We couldn't find any articles matching your search. Try using different keywords.
            </Typography>
            <Button
              variant="contained"
              href="/blog"
              sx={{
                mt: 3,
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
              }}
            >
              View All Articles
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}