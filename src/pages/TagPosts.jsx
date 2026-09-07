import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../site.config";
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function TagPosts() {
  const { tag } = useParams();
  const { posts } = useContext(BlogContext);
  const filteredPosts = posts.filter((post) =>
    (post.frontmatter?.tags || []).includes(tag)
  );

  return (
    <>
      <Helmet>
        <title>Posts tagged "{tag}" — {siteConfig.blogName}</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content={`Browse all articles tagged with ${tag}`}
        />
      </Helmet>

      <Box sx={{ width: "100%" }}>
        {/* Back Link */}
        <Link to="/blog" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#15656f",
              fontWeight: 600,
              mb: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                gap: 1,
              },
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Back to Blog
          </Box>
        </Link>

        {/* Header */}
        <Box sx={{ mb: 6, display: "flex", alignItems: "center", gap: 2 }}>
          <LocalOfferIcon sx={{ fontSize: "2rem", color: "#15656f" }} />
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#212121",
              }}
            >
              Tag: {tag}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#757575",
              }}
            >
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} found
            </Typography>
          </Box>
        </Box>

        {/* Tag Chip */}
        <Box sx={{ mb: 4 }}>
          <Chip
            label={`#${tag}`}
            variant="filled"
            sx={{
              background: "linear-gradient(135deg, #15656f 0%, #0b343c 100%)",
              color: "white",
              fontWeight: 700,
              height: "36px",
              fontSize: "1rem",
            }}
          />
        </Box>

        {/* Results */}
        {filteredPosts.length > 0 ? (
          <Grid container spacing={3}>
            {filteredPosts.map((post) => (
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
            <Typography
              variant="h6"
              sx={{
                color: "#757575",
                mb: 2,
              }}
            >
              No Posts Found
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#9e9e9e",
                mb: 3,
              }}
            >
              There are no articles tagged with "{tag}" yet.
            </Typography>
            <Button
              variant="contained"
              href="/blog"
              sx={{
                background: "linear-gradient(135deg, #15656f 0%, #0b343c 100%)",
                color: "white",
                fontWeight: 700,
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