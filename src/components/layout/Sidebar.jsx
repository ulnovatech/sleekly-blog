import { Link } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EditIcon from "@mui/icons-material/Edit";

const DRAWER_WIDTH = 280;

export default function Sidebar() {
  const { posts } = useContext(BlogContext);
  const tags = [...new Set(posts.flatMap((post) => post.frontmatter?.tags || []))].slice(0, 10);

  const mainLinks = [
    { label: "Home", to: "/", icon: <HomeIcon /> },
    { label: "Blog", to: "/blog", icon: <ArticleIcon /> },
    { label: "Edit Blog", to: "/manage-posts", icon: <EditIcon /> },
    { label: "About", to: "/about", icon: <InfoIcon /> },
    { label: "Contact", to: "/contact", icon: <MailIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", lg: "block" },
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #e0e0e0",
          mt: { xs: "56px", sm: "64px" },
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Main Navigation Section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#212121",
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Explore
        </Typography>

        <List sx={{ py: 0 }}>
          {mainLinks.map((link) => (
            <Link
              to={link.to}
              key={link.label}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                sx={{
                  borderRadius: "8px",
                  mb: 0.5,
                  color: "#424242",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    color: "#15656f",
                    pl: 2,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: "inherit",
                  }}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Popular Tags Section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#212121",
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <LocalOfferIcon sx={{ mr: 1, fontSize: "1rem", mb: 0.2 }} />
          Popular Tags
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                key={tag}
                style={{ textDecoration: "none" }}
              >
                <Chip
                  label={`#${tag.toLowerCase()}`}
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "100%",
                    color: "#15656f",
                    borderColor: "#15656f",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                      borderColor: "#0b343c",
                      color: "#0b343c",
                    },
                  }}
                />
              </Link>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No tags available
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}


// import { Link } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <aside className="hidden lg:block w-64 bg-gray-100 border-r border-gray-200 p-4">
//       <h2 className="text-lg font-semibold mb-4">Explore</h2>
//       <ul className="space-y-3">
//         <li><Link className="hover:text-blue-600" to="/">🏠 Home</Link></li>
//         <li><Link className="hover:text-blue-600" to="/blog">📰 Blog</Link></li>
//         <li><a className="hover:text-blue-600" href="#">📚 Resources</a></li>
//         <li><a className="hover:text-blue-600" href="#">📞 Contact</a></li>
//       </ul>
//     </aside>
//   );
// }
