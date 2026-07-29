import { Link } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Button,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../site.config";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>Admin — {siteConfig.blogName}</title>
        <meta name="description" content="Manage your blog posts and content." />
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
            Admin Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#757575",
              fontWeight: 300,
            }}
          >
            Manage your blog content and site settings
          </Typography>
        </Box>

        {/* Alert */}
        <Alert
          severity="info"
          sx={{ mb: 4 }}
          icon={<InfoIcon />}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Using Decap CMS
          </Typography>
          <Typography variant="body2">
            All changes are committed to Git and automatically deploy to Netlify.
          </Typography>
        </Alert>

        <Grid container spacing={3}>
          {/* Decap CMS Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 4,
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <EditIcon sx={{ fontSize: "2rem", color: "#1976d2" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#212121",
                    m: 0,
                  }}
                >
                  Decap CMS Editor
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#757575",
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Create, edit, and delete blog posts using our content management system. The
                editor provides a user-friendly interface for managing your articles.
              </Typography>
              <Box
                sx={{
                  mt: "auto",
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <a href="/blog/admin/" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    Open CMS Editor
                  </Button>
                </a>
                <Button
                  variant="outlined"
                  href="https://decapcms.org/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    fontWeight: 700,
                  }}
                >
                  Help & Documentation
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Quick Links Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 4,
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <DescriptionIcon sx={{ fontSize: "2rem", color: "#1976d2" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#212121",
                    m: 0,
                  }}
                >
                  Content Management
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#757575",
                  mb: 2,
                  lineHeight: 1.6,
                }}
              >
                Quick access to common tasks
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem sx={{ pl: 0, py: 0.75 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AddIcon sx={{ color: "#1976d2" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Create New Post"
                    primaryTypographyProps={{
                      sx: { fontWeight: 600, color: "#1976d2", cursor: "pointer" },
                    }}
                    component="a"
                    href="/blog/admin/#/collections/blog/new"
                  />
                </ListItem>
                <ListItem sx={{ pl: 0, py: 0.75 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <DescriptionIcon sx={{ color: "#1976d2" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Manage Posts"
                    primaryTypographyProps={{
                      sx: { fontWeight: 600, color: "#1976d2", cursor: "pointer" },
                    }}
                    component="a"
                    href="/blog/admin/#/collections/blog"
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>

          {/* Site Status Card */}
          <Grid item xs={12}>
            <Card
              sx={{
                p: 4,
                bgColor: "#f5f5f5",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#212121",
                }}
              >
                System Information
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItem
                  sx={{
                    pl: 0,
                    py: 1,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: "#4caf50" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="CMS Status"
                    secondary="Connected"
                    secondaryTypographyProps={{
                      sx: { color: "#4caf50", fontWeight: 600 },
                    }}
                  />
                </ListItem>
                <ListItem
                  sx={{
                    pl: 0,
                    py: 1,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: "#4caf50" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Git Repository"
                    secondary="Connected"
                    secondaryTypographyProps={{
                      sx: { color: "#4caf50", fontWeight: 600 },
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: "#4caf50" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Netlify Deployment"
                    secondary="Ready"
                    secondaryTypographyProps={{
                      sx: { color: "#4caf50", fontWeight: 600 },
                    }}
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>

        {/* Navigation */}
        <Box sx={{ mt: 6, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                color: "#1976d2",
                borderColor: "#1976d2",
                fontWeight: 700,
              }}
            >
              View Blog
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                color: "#1976d2",
                borderColor: "#1976d2",
                fontWeight: 700,
              }}
            >
              Back to Home
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}