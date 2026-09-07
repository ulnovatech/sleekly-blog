import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
  Container,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function ManagePosts() {
  const { posts, loading } = useContext(BlogContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = posts.filter(
    (post) =>
      post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement actual delete functionality
    console.log("Delete post:", selectedPost.slug);
    setDeleteDialogOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <Helmet>
        <title>Manage Posts - ULN Blog</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Manage and edit your blog posts." />
      </Helmet>

      <Container maxWidth="lg">
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
            Manage Posts
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#757575",
              fontWeight: 300,
              mb: 4,
            }}
          >
            View, edit, and delete your blog posts from here.
          </Typography>

          {/* Alert */}
          <Alert
            severity="info"
            sx={{ mb: 4 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Using Decap CMS for Content Management
            </Typography>
            <Typography variant="body2">
              To edit posts with full features, click "Edit in CMS" or visit the <Link to="/dashboard" style={{ color: "inherit", fontWeight: "bold", textDecoration: "underline" }}>Admin Dashboard</Link>.
            </Typography>
          </Alert>

          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search posts by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 4 }}
            slotProps={{
              input: {
                startAdornment: (
                  <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                    🔍
                  </Box>
                ),
              },
            }}
          />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              href="/blog/admin/#/collections/blog/new"
              target="_blank"
              sx={{
                background: "linear-gradient(135deg, #15656f 0%, #0b343c 100%)",
                color: "white",
                fontWeight: 700,
              }}
            >
              Create New Post
            </Button>
            <Button
              variant="outlined"
              href="/blog/admin/"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
              sx={{
                color: "#15656f",
                borderColor: "#15656f",
                fontWeight: 700,
              }}
            >
              Go to CMS Editor
            </Button>
          </Box>
        </Box>

        {/* Posts Grid */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <Typography>Loading posts...</Typography>
          </Box>
        ) : filteredPosts.length === 0 ? (
          <Card sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#757575", mb: 2 }}>
              {searchQuery ? "No posts match your search." : "No blog posts found."}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              href="/blog/admin/#/collections/blog/new"
              target="_blank"
              sx={{
                background: "linear-gradient(135deg, #15656f 0%, #0b343c 100%)",
                color: "white",
                fontWeight: 700,
              }}
            >
              Create First Post
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.slug}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#212121",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.frontmatter.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#757575",
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.frontmatter.description}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                      {post.frontmatter.tags && post.frontmatter.tags.slice(0, 2).map((tag) => (
                        <Chip
                          key={tag}
                          label={`#${tag}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: "24px",
                            fontSize: "0.75rem",
                            color: "#15656f",
                            borderColor: "#15656f",
                          }}
                        />
                      ))}
                      {post.frontmatter.tags && post.frontmatter.tags.length > 2 && (
                        <Chip
                          label={`+${post.frontmatter.tags.length - 2}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: "24px",
                            fontSize: "0.75rem",
                            color: "#15656f",
                            borderColor: "#15656f",
                          }}
                        />
                      )}
                    </Box>

                    <Typography variant="caption" sx={{ color: "#999" }}>
                      Slug: <code style={{ fontSize: "0.75rem" }}>{post.slug}</code>
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#999", display: "block" }}>
                      {post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString() : "No date"}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ pt: 0 }}>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      href={`/blog/admin/#/collections/blog/${post.slug}`}
                      target="_blank"
                      sx={{
                        color: "#15656f",
                        fontWeight: 600,
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(post)}
                      sx={{
                        color: "#d32f2f",
                        fontWeight: 600,
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle sx={{ fontWeight: 700, color: "#212121" }}>
            Delete Post?
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "#757575", mt: 1 }}>
              Are you sure you want to delete "{selectedPost?.frontmatter.title}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
