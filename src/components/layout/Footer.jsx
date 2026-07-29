import { Link } from "react-router-dom";
import { Box, Container, Typography, Grid, Link as MuiLink } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { siteConfig } from "../../site.config";

const accent = "#d4a84b";
const muted = "rgba(248,244,236,0.75)";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Blog", to: "/blog" },
    { label: "Main site", href: siteConfig.homeUrl, external: true },
  ];

  const socialLinks = [
    { icon: <LinkedInIcon />, url: siteConfig.social.linkedin, label: "LinkedIn" },
    { icon: <InstagramIcon />, url: siteConfig.social.instagram, label: "Instagram" },
    { icon: <YouTubeIcon />, url: siteConfig.social.youtube, label: "YouTube" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2d5346",
        color: "#f8f4ec",
        mt: "auto",
        pt: 6,
        pb: 3,
        borderTop: `4px solid ${accent}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: accent }}>
              {siteConfig.blogName}
            </Typography>
            <Typography variant="body2" sx={{ color: muted, lineHeight: 1.8 }}>
              {siteConfig.description}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: accent }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.map((link) =>
                link.external ? (
                  <MuiLink
                    href={link.href}
                    key={link.label}
                    sx={{ color: muted, textDecoration: "none", "&:hover": { color: accent } }}
                  >
                    {link.label}
                  </MuiLink>
                ) : (
                  <MuiLink
                    component={Link}
                    to={link.to}
                    key={link.label}
                    sx={{ color: muted, textDecoration: "none", "&:hover": { color: accent } }}
                  >
                    {link.label}
                  </MuiLink>
                ),
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: accent }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {socialLinks.map((social) => (
                <MuiLink
                  href={social.url}
                  key={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: muted,
                    "&:hover": { color: accent, transform: "translateY(-2px)" },
                    transition: "all 0.3s ease",
                  }}
                >
                  {social.icon}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(248,244,236,0.15)",
            pt: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: muted }}>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: muted }}>
            Made with care by {siteConfig.teamName}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
