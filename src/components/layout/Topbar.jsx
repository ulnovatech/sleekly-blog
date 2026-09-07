import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article'
import InfoIcon from '@mui/icons-material/Info'
import MailIcon from '@mui/icons-material/Mail'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { BrandMark } from '@sleeklybuilt/design-foundation/react'
import { siteConfig } from '../../site.config'
import { brand } from '../../brand'

function RouterLink({ href, className, children, ...rest }) {
  return (
    <Link to={href} className={className} {...rest}>
      {children}
    </Link>
  )
}

export default function Topbar() {
  const [showAdmin, setShowAdmin] = useState(false)
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null)

  useEffect(() => {
    function handleKeydown(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        setShowAdmin(true)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  const handleMobileMenuOpen = (e) => setMobileMenuAnchor(e.currentTarget)
  const handleMobileMenuClose = () => setMobileMenuAnchor(null)

  const navLinks = [
    { label: 'Home', to: '/', icon: <HomeIcon fontSize="small" /> },
    { label: 'Blog', to: '/blog', icon: <ArticleIcon fontSize="small" /> },
    { label: 'About', to: '/about', icon: <InfoIcon fontSize="small" /> },
    { label: 'Contact', to: '/contact', icon: <MailIcon fontSize="small" /> },
  ]

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: brand.obsidian,
        borderBottom: `1px solid ${brand.emeraldDeep}`,
        color: brand.cream,
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: 56 }}>
        <BrandMark
          name={siteConfig.name}
          href="/"
          tone="hero"
          LinkComponent={RouterLink}
        />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 'auto', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              component={Link}
              to={link.to}
              startIcon={link.icon}
              sx={{
                color: 'rgba(244,243,239,0.85)',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 2,
                px: 1.5,
                minHeight: 44,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)', color: brand.cream },
              }}
            >
              {link.label}
            </Button>
          ))}

          <Button
            component="a"
            href={siteConfig.homeUrl}
            sx={{
              ml: 1,
              color: brand.ink,
              bgcolor: brand.gold,
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 44,
              px: 2.5,
              '&:hover': { bgcolor: brand.goldSoft },
            }}
          >
            Main site
          </Button>

          {showAdmin ? (
            <Button
              component={Link}
              to="/dashboard"
              startIcon={<AdminPanelSettingsIcon />}
              sx={{
                color: brand.cream,
                textTransform: 'none',
                fontWeight: 600,
                border: `1px solid rgba(244,243,239,0.35)`,
                minHeight: 44,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              Admin
            </Button>
          ) : null}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
          <IconButton
            color="inherit"
            onClick={handleMobileMenuOpen}
            aria-label="Open menu"
            sx={{ minWidth: 44, minHeight: 44 }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
        >
          {navLinks.map((link) => (
            <MenuItem
              key={link.label}
              component={Link}
              to={link.to}
              onClick={handleMobileMenuClose}
              sx={{ gap: 1, minHeight: 44 }}
            >
              {link.icon}
              {link.label}
            </MenuItem>
          ))}
          <MenuItem
            component="a"
            href={siteConfig.homeUrl}
            onClick={handleMobileMenuClose}
            sx={{ minHeight: 44, fontWeight: 600 }}
          >
            Main site
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
