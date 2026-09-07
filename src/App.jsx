import { useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BlogProvider } from './context/BlogContext'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { AttendantProvider, AttendantRoot, useAttendant } from '@sleeklybuilt/attendant'
import theme from './theme'
import { siteConfig } from './site.config'

import Topbar from './components/layout/Topbar'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import SearchResults from './pages/SearchResults'
import TagPosts from './pages/TagPosts'
import Optimizer from './pages/Optimizer'

import './styles/globals.css'
import './styles/blog.css'

function AppShell() {
  const { open, minimized } = useAttendant()
  const docked = open && !minimized

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        pr: docked ? { lg: '380px' } : 0,
        transition: 'padding-right 200ms ease',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      }}
    >
      <Topbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3, md: 4 },
            maxWidth: '1200px',
            mx: 'auto',
            width: '100%',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="tags/:tag" element={<TagPosts />} />
            <Route path="optimizer" element={<Optimizer />} />
            <Route path="dashboard" element={<Navigate to="/admin/" replace />} />
            <Route path="manage-posts" element={<Navigate to="/admin/" replace />} />
            <Route path="admin/*" element={<Navigate to="/admin/" replace />} />
            <Route path=":slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
      <AttendantRoot />
    </Box>
  )
}

export default function App() {
  const site = useMemo(
    () => ({
      name: siteConfig.name,
      whatsapp: siteConfig.whatsapp,
      primaryPhone: siteConfig.primaryPhone,
      email: siteConfig.email,
    }),
    [],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BlogProvider>
        <HelmetProvider>
          <BrowserRouter basename="/blog">
            <AttendantProvider host="blog" basePath="/blog" site={site}>
              <AppShell />
            </AttendantProvider>
          </BrowserRouter>
        </HelmetProvider>
      </BlogProvider>
    </ThemeProvider>
  )
}

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found — {siteConfig.blogName}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-content-primary)' }}>404 – Page Not Found</h2>
        <p style={{ color: 'var(--color-content-secondary)' }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </Box>
    </>
  )
}
