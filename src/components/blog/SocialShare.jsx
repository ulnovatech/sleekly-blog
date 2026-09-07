import { useLocation } from "react-router-dom";
import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { publicBlogUrl } from "../../lib/seo";

export default function SocialShare({ title }) {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const currentUrl = publicBlogUrl(location.pathname);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      icon: <XIcon />,
      label: "X (Twitter)",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      color: "#1DA1F2",
    },
    {
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: "#0077B5",
    },
    {
      icon: <FacebookIcon />,
      label: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: "#1877F2",
    },
  ];

  return (
    <Box
      sx={{
        my: 4,
        py: 3,
        px: 3,
        borderRadius: "12px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <ShareIcon sx={{ color: "#15656f", fontSize: "1.5rem" }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#212121",
            m: 0,
          }}
        >
          Share This Article
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {shareLinks.map((link) => (
          <Tooltip key={link.label} title={link.label}>
            <IconButton
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: link.color,
                backgroundColor: "white",
                border: `2px solid ${link.color}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: link.color,
                  color: "white",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {link.icon}
            </IconButton>
          </Tooltip>
        ))}

        {/* Copy Link Button */}
        <Tooltip title={copied ? "Copied!" : "Copy Link"}>
          <IconButton
            onClick={handleCopy}
            sx={{
              color: "#9c27b0",
              backgroundColor: "white",
              border: "2px solid #9c27b0",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#9c27b0",
                color: "white",
                transform: "translateY(-2px)",
              },
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}