import { formatDate } from "../../utils/dateFormatter";
import { Link } from "react-router-dom";
import { Box, Typography, Chip, Stack } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { siteConfig } from "../../site.config";

export default function BlogMeta({ frontmatter }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        py: 2,
        mb: 3,
        pb: 3,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* Date */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <CalendarTodayIcon sx={{ fontSize: "1rem", color: "#9e9e9e" }} />
        <Typography variant="body2" sx={{ color: "#9e9e9e", fontWeight: 500 }}>
          {formatDate(frontmatter.date)}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
        •
      </Typography>

      {/* Author */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <PersonIcon sx={{ fontSize: "1rem", color: "#9e9e9e" }} />
        <Typography variant="body2" sx={{ color: "#9e9e9e", fontWeight: 500 }}>
          By {frontmatter.author || siteConfig.teamName}
        </Typography>
      </Box>

      {/* Tags */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            •
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <LocalOfferIcon sx={{ fontSize: "1rem", color: "#15656f" }} />
            <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
              {frontmatter.tags.map((tag, idx) => (
                <Link
                  to={`/tags/${tag.trim()}`}
                  key={idx}
                  style={{ textDecoration: "none" }}
                >
                  <Chip
                    label={`#${tag.trim()}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: "24px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#15656f",
                      borderColor: "#15656f",
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
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
}



// export default function BlogMeta({ frontmatter }) {
//   return (
//     <div className="blog-meta">
//       <span>{frontmatter.date}</span>
//       {frontmatter.tags && (
//         <ul className="tags">
//           {frontmatter.tags.split(",").map((tag, idx) => (
//             <li key={idx}>#{tag.trim()}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
