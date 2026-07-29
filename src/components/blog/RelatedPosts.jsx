import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import BlogCard from "./BlogCard";
import { Box, Typography, Grid } from "@mui/material";

export default function RelatedPosts({ currentSlug, tags }) {
  const { posts } = useContext(BlogContext);
  const related = posts
    .filter((post) => post.slug !== currentSlug && tags.some((tag) => post.frontmatter?.tags?.includes(tag)))
    .slice(0, 3);

  if (!related.length)
    return null;

  return (
    <Box sx={{ my: 8 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 4,
          color: "#212121",
        }}
      >
        Related Articles
      </Typography>
      <Grid container spacing={3}>
        {related.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.slug}>
            <BlogCard slug={post.slug} frontmatter={post.frontmatter} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}