import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { siteConfig } from "../../site.config";

export default function Topbar() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        setShowAdmin(true);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleMobileMenuOpen = (e) => setMobileMenuAnchor(e.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuAnchor(null);

  const navLinks = [
    { label: "Home", to: "/", icon: <HomeIcon /> },
    { label: "Blog", to: "/blog", icon: <ArticleIcon /> },
    { label: "About", to: "/about", icon: <InfoIcon /> },
    { label: "Contact", to: "/contact", icon: <MailIcon /> },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #3f7a62 0%, #2d5346 100%)",
        boxShadow: "0 4px 12px rgba(45,83,70,0.2)",
      }}
    >
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "white",
              mr: 4,
              "&:hover": { opacity: 0.9 },
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {siteConfig.blogName}
          </Typography>
        </Link>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: "auto" }}>
          {navLinks.map((link) => (
            <Link to={link.to} key={link.label} style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {link.icon}
                {link.label}
              </Button>
            </Link>
          ))}

          <Button
            component="a"
            href={siteConfig.homeUrl}
            sx={{
              color: "#2d5346",
              bgcolor: "#d4a84b",
              textTransform: "none",
              fontWeight: 600,
              ml: 1,
              "&:hover": { bgcolor: "#e4c47a" },
            }}
          >
            Main site
          </Button>

          {showAdmin && (
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "#d4a84b",
                  textTransform: "none",
                  fontWeight: 600,
                  border: "2px solid #d4a84b",
                  "&:hover": { bgcolor: "#d4a84b", color: "#2d5346" },
                }}
              >
                <AdminPanelSettingsIcon sx={{ mr: 0.5 }} />
                Admin
              </Button>
            </Link>
          )}
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
          <IconButton color="inherit" onClick={handleMobileMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Menu anchorEl={mobileMenuAnchor} open={Boolean(mobileMenuAnchor)} onClose={handleMobileMenuClose}>
          {navLinks.map((link) => (
            <Link to={link.to} key={link.label} style={{ textDecoration: "none", color: "inherit" }}>
              <MenuItem onClick={handleMobileMenuClose} sx={{ display: "flex", gap: 1 }}>
                {link.icon}
                {link.label}
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
