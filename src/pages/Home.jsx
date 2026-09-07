import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { siteConfig } from "../site.config";
import { DEFAULT_OG_IMAGE, publicBlogUrl } from "../lib/seo";

export default function Home() {
  const { posts, loading } = useContext(BlogContext);
  const featuredPosts = posts.slice(0, 3);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="textSecondary">
          Loading...
        </Typography>
      </Box>
    );

  return (
    <>
      <Helmet>
        <title>{siteConfig.blogName} — Latest insights</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="canonical" href={publicBlogUrl('/')} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${siteConfig.blogName} — Latest insights`} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={publicBlogUrl('/')} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Box sx={{ width: "100%" }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #15656f 0%, #0b343c 100%)",
            color: "white",
            py: { xs: 4, sm: 6, md: 8 },
            mb: 6,
            borderRadius: "12px",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: "white",
            }}
          >
            Welcome to {siteConfig.blogName}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 300,
              mb: 4,
              opacity: 0.95,
              color: "white",
            }}
          >
            Latest insights, tutorials, and stories from our tech team. Stay ahead
            in the world of technology.
          </Typography>
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowRightIcon />}
              sx={{
                backgroundColor: "#fff",
                color: "#15656f",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  transform: "translateX(4px)",
                },
              }}
            >
              Read the Blog
            </Button>
          </Link>
        </Box>

        {/* Featured Posts Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#212121",
              }}
            >
              Featured Posts
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#757575",
                fontSize: "1.05rem",
              }}
            >
              Check out our latest articles and stay updated with the tech world.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {featuredPosts.length > 0 ? (
              featuredPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.slug}>
                  <BlogCard slug={post.slug} frontmatter={post.frontmatter} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  No featured posts available at the moment.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 100%)",
            borderRadius: "12px",
            p: { xs: 3, sm: 4, md: 6 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#212121",
            }}
          >
            Explore More Content
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#757575",
              mb: 3,
              fontSize: "1.05rem",
            }}
          >
            Visit our blog to read all articles covering web development, tech trends,
            agriculture, and more.
          </Typography>
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(135deg, #15656f 0%, #0b343c 100%)",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              View All Articles
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
