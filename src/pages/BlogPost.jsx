import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { loadPostContent } from "../lib/loadPostContent";
import BlogContent from "../components/blog/BlogContent";
import BlogMeta from "../components/blog/BlogMeta";
import RelatedPosts from "../components/blog/RelatedPosts";
import SocialShare from "../components/blog/SocialShare";
import Comments from "../components/blog/Comments";
import { Helmet } from "react-helmet-async";
import { Box, CircularProgress, Alert, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { siteConfig } from "../site.config";
import { DEFAULT_OG_IMAGE, absolutePublicUrl, publicBlogUrl } from "../lib/seo";

export default function BlogPost() {
  const { slug } = useParams();
  const { posts } = useContext(BlogContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const listMeta = posts.find((p) => p.slug === slug);

  useEffect(() => {
    let cancelled = false;

    async function fetchPost() {
      setLoading(true);
      setError(null);
      try {
        const loaded = await loadPostContent(slug);
        if (cancelled) return;
        if (!loaded) {
          setPost(null);
          setError("not_found");
          return;
        }
        setPost(loaded);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("load_failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post || error === "not_found") {
    return (
      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        <Helmet>
          <title>Post not found — {siteConfig.blogName}</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
            Post Not Found
          </Typography>
          <Typography variant="body2">
            The article you're looking for doesn't exist or has been removed.
          </Typography>
        </Alert>
        <Link to="/blog" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#15656f",
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <ArrowBackIcon />
            Back to Blog
          </Box>
        </Link>
      </Box>
    );
  }

  if (error === "load_failed") {
    return (
      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        <Helmet>
          <title>Could not load post — {siteConfig.blogName}</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Could not load this article. Please refresh the page.
        </Alert>
      </Box>
    );
  }

  const { frontmatter, content } = post;
  const title = frontmatter?.title || listMeta?.frontmatter?.title || "Untitled Post";
  const description = frontmatter?.description || listMeta?.frontmatter?.description || siteConfig.description;
  const tags = frontmatter?.tags || listMeta?.frontmatter?.tags || [];
  const canonical = publicBlogUrl(`/${slug}`);
  const ogImage = absolutePublicUrl(frontmatter?.image);
  const published = frontmatter?.date || listMeta?.frontmatter?.date || '';
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: ogImage,
    datePublished: published || undefined,
    author: {
      '@type': 'Organization',
      name: frontmatter?.author || siteConfig.teamName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
    },
    mainEntityOfPage: canonical,
  };

  return (
    <>
      <Helmet>
        <title>{title} – {siteConfig.blogName}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        {published ? <meta property="article:published_time" content={published} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      </Helmet>

      <article sx={{ width: "100%" }}>
        <Box sx={{ maxWidth: "800px", mx: "auto" }}>
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

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#212121",
              lineHeight: 1.3,
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="h6"
              sx={{
                color: "#757575",
                fontWeight: 300,
                mb: 3,
                fontSize: "1.1rem",
              }}
            >
              {description}
            </Typography>
          )}

          <BlogMeta frontmatter={frontmatter} />

          {frontmatter?.image && (
            <Box
              component="img"
              src={frontmatter.image}
              alt={title}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "12px",
                mb: 4,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          <Box sx={{ mb: 4 }}>
            <BlogContent post={{ frontmatter, body: content }} />
          </Box>

          <SocialShare title={title} />
          <RelatedPosts currentSlug={slug} tags={tags} />
          <Comments slug={slug} />
        </Box>
      </article>
    </>
  );
}
