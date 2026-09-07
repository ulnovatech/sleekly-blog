import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

import { siteConfig } from "../../site.config";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23e0e0e0' width='400' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%239e9e9e'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export default function BlogCard({ slug, frontmatter }) {
  const {
    title = "Untitled",
    description = "No description",
    date = "",
    image = PLACEHOLDER_IMAGE,
    author = siteConfig.teamName,
    tags = [],
  } = frontmatter;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No date";

  return (
    <Link to={`/${slug}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {/* Card Image */}
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            objectFit: "cover",
            backgroundColor: "#e0e0e0",
          }}
          onError={(e) => {
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Title */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#212121",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "3em",
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "#757575",
              mb: 2,
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                {tags.slice(0, 2).map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: "24px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#15656f",
                      borderColor: "#15656f",
                    }}
                  />
                ))}
                {tags.length > 2 && (
                  <Chip
                    label={`+${tags.length - 2}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: "24px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#9e9e9e",
                      borderColor: "#9e9e9e",
                    }}
                  />
                )}
              </Stack>
            </Box>
          )}

          {/* Meta Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginTop: "auto",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: "1rem", color: "#9e9e9e" }} />
              <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                {formattedDate}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
              •
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: "1rem", color: "#9e9e9e" }} />
              <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                {author}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}