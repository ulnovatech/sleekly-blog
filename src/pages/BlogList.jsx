import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import SearchBar from "../components/blog/SearchBar";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../site.config";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Stack,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const POSTS_PER_CHUNK = 6;

export default function BlogList() {
  const { posts, loading } = useContext(BlogContext);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const observerRef = useRef(null);

  // Get unique tags
  const allTags = [...new Set(posts.flatMap((post) => post.frontmatter?.tags || []))];

  // Filter posts based on search and tag (memoized to prevent infinite loops)
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.frontmatter?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter?.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === "" || post.frontmatter?.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Load initial posts
  useEffect(() => {
    if (!loading && filteredPosts.length > 0) {
      setVisiblePosts(filteredPosts.slice(0, POSTS_PER_CHUNK));
      setPage(1);
    } else if (filteredPosts.length === 0) {
      setVisiblePosts([]);
    }
  }, [loading, searchQuery, selectedTag, filteredPosts]);

  // Set up Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          visiblePosts.length < filteredPosts.length
        ) {
          setVisiblePosts((prev) =>
            filteredPosts.slice(0, prev.length + POSTS_PER_CHUNK)
          );
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, filteredPosts]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTag("");
  };

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
        <title>All posts — {siteConfig.blogName}</title>
        <meta
          name="description"
          content="Browse all blog posts on tech topics, insights, and tutorials."
        />
      </Helmet>

      <Box sx={{ width: "100%" }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#212121",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Blog Posts
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#757575",
              fontWeight: 300,
              fontSize: "1.1rem",
            }}
          >
            Explore our collection of articles on web development, technology trends, and more.
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment:
                searchQuery && (
                  <InputAdornment position="end">
                    <Button
                      size="small"
                      onClick={() => setSearchQuery("")}
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
                fontSize: "1rem",
              },
            }}
          />

          {/* Tag Filters */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: "#424242",
                mb: 1.5,
                textTransform: "uppercase",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
              }}
            >
              Filter by Tag
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              <Chip
                label="All Tags"
                onClick={() => setSelectedTag("")}
                variant={selectedTag === "" ? "filled" : "outlined"}
                sx={{
                  background: selectedTag === "" ? "#1976d2" : "transparent",
                  color: selectedTag === "" ? "white" : "#1976d2",
                  borderColor: "#1976d2",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: selectedTag === "" ? "#1565c0" : "#e3f2fd",
                  },
                }}
              />
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  onClick={() => setSelectedTag(tag)}
                  variant={selectedTag === tag ? "filled" : "outlined"}
                  sx={{
                    background: selectedTag === tag ? "#1976d2" : "transparent",
                    color: selectedTag === tag ? "white" : "#1976d2",
                    borderColor: "#1976d2",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: selectedTag === tag ? "#1565c0" : "#e3f2fd",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Clear Filters Button */}
          {(searchQuery || selectedTag) && (
            <Button
              size="small"
              onClick={handleClearFilters}
              sx={{
                mt: 2,
                color: "#d32f2f",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#ffebee",
                },
              }}
            >
              Clear Filters
            </Button>
          )}
        </Box>

        {/* Posts Grid */}
        {visiblePosts.length > 0 ? (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {visiblePosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.slug}>
                  <BlogCard slug={post.slug} frontmatter={post.frontmatter} />
                </Grid>
              ))}
            </Grid>

            {/* Loading Observer */}
            {visiblePosts.length < filteredPosts.length && (
              <Box
                ref={observerRef}
                sx={{ display: "flex", justifyContent: "center", py: 4 }}
              >
                <CircularProgress />
              </Box>
            )}
          </>
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
            <Typography
              variant="h6"
              sx={{
                color: "#757575",
                mb: 2,
              }}
            >
              No articles found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#9e9e9e",
              }}
            >
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "Try adjusting your filters"}
            </Typography>
            {(searchQuery || selectedTag) && (
              <Button
                size="large"
                onClick={handleClearFilters}
                sx={{
                  mt: 2,
                  background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// function parseFrontmatter(raw) {
//   const match = raw.match(/^---\n([\s\S]+?)\n---/);
//   let frontmatter = {};
//   let body = raw;
//   if (match) {
//     const yamlText = match[1];
//     frontmatter = Object.fromEntries(
//       yamlText.split("\n").map(line => line.split(": ").map(s => s.trim()))
//     );
//     body = raw.slice(match[0].length);
//   }




//   return { frontmatter, body };


// }

// export default function BlogList() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     async function loadPosts() {
//       const files = import.meta.glob("/content/posts/*.md", { as: "raw" });
//       const loadedPosts = [];

//       for (const path in files) {
//         const raw = await files[path]();
//         const { frontmatter } = parseFrontmatter(raw);
//         const slug = path.split("/").pop().replace(".md", "");
//         loadedPosts.push({ slug, frontmatter });
//       }

//       setPosts(loadedPosts);
//     }

//     loadPosts();
//   }, []);

//   if (!posts.length) return <p>No posts found. Add some in /content/posts.</p>;

//   return (
//     <div>
//       <h1>Blog</h1>
//       <ul>
//         {posts.map(post => (
//           <li key={post.slug}>
//             <Link to={`/blog/${post.slug}`}>
//               <h2>{post.frontmatter.title ?? "Untitled"}</h2>
//               <p>{post.frontmatter.description ?? "No description"}</p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
