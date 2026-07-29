import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "./theme";

import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults";
import TagPosts from "./pages/TagPosts";
import Optimizer from "./pages/Optimizer";

import "./styles/globals.css";
import "./styles/blog.css";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BlogProvider>
        <HelmetProvider>
          <BrowserRouter basename="/blog">
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default" }}>
              <Topbar />
              <Box sx={{ display: "flex", flex: 1 }}>
                <Sidebar />
                <Box
                  component="main"
                  sx={{
                    flex: 1,
                    p: { xs: 2, sm: 3, md: 4 },
                    maxWidth: "1200px",
                    mx: "auto",
                    width: "100%",
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="blog" element={<BlogList />} />
                    <Route path="blog/:slug" element={<BlogPost />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path="tags/:tag" element={<TagPosts />} />
                    <Route path="optimizer" element={<Optimizer />} />
                    <Route path="dashboard" element={<Navigate to="/admin/" replace />} />
                    <Route path="manage-posts" element={<Navigate to="/admin/" replace />} />
                    <Route path="admin/*" element={<Navigate to="/admin/" replace />} />
                    <Route
                      path="*"
                      element={
                        <Box sx={{ textAlign: "center", mt: 10 }}>
                          <h2 style={{ fontSize: "2rem", color: "#212121" }}>
                            404 – Page Not Found
                          </h2>
                          <p style={{ color: "#757575" }}>
                            The page you're looking for doesn't exist.
                          </p>
                        </Box>
                      }
                    />
                  </Routes>
                </Box>
              </Box>
              <Footer />
            </Box>
          </BrowserRouter>
        </HelmetProvider>
      </BlogProvider>
    </ThemeProvider>
  );
}