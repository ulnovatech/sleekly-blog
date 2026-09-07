import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Box } from "@mui/material";

export default function BlogContent({ post }) {
  if (!post) return null;

  const { body } = post;

  return (
    <Box
      sx={{
        "& > *": {
          mb: 2,
        },
        "& h1": {
          fontSize: "2.5rem",
          fontWeight: 700,
          color: "#212121",
          mt: 4,
          mb: 2,
          lineHeight: 1.2,
        },
        "& h2": {
          fontSize: "2rem",
          fontWeight: 700,
          color: "#212121",
          mt: 3,
          mb: 1.5,
          paddingTop: "0.5rem",
          borderTop: "1px solid #e0e0e0",
        },
        "& h3": {
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#212121",
          mt: 2,
          mb: 1,
        },
        "& h4": {
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#424242",
          mt: 1.5,
          mb: 0.75,
        },
        "& h5, & h6": {
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#424242",
        },
        "& p": {
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "#424242",
          mb: 1.5,
        },
        "& strong": {
          fontWeight: 700,
          color: "#212121",
        },
        "& em": {
          fontStyle: "italic",
          color: "#424242",
        },
        "& ul, & ol": {
          mb: 2,
          "& li": {
            mb: 0.5,
            lineHeight: 1.6,
            color: "#424242",
            fontSize: "1rem",
          },
        },
        "& ul": {
          paddingLeft: "2rem",
          listStyleType: "disc",
        },
        "& ol": {
          paddingLeft: "2rem",
          listStyleType: "decimal",
        },
        "& blockquote": {
          borderLeft: "4px solid #15656f",
          paddingLeft: "1.5rem",
          my: 2,
          fontStyle: "italic",
          color: "#757575",
          bgcolor: "rgba(25, 118, 210, 0.05)",
          py: 1.5,
          px: 2,
          borderRadius: "4px",
        },
        "& code": {
          backgroundColor: "#f5f5f5",
          padding: "0.2em 0.4em",
          borderRadius: "4px",
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: "0.9em",
          color: "#d32f2f",
        },
        "& pre": {
          backgroundColor: "#212121",
          color: "#e0e0e0",
          padding: "1rem",
          borderRadius: "8px",
          overflow: "auto",
          mb: 2,
          "& code": {
            backgroundColor: "transparent",
            color: "inherit",
            padding: 0,
            fontSize: "0.95em",
          },
        },
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
          my: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        },
        "& a": {
          color: "#15656f",
          textDecoration: "none",
          fontWeight: 500,
          transition: "all 0.3s ease",
          borderBottom: "1px solid transparent",
          "&:hover": {
            borderBottomColor: "#15656f",
          },
        },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          mb: 2,
          "& th": {
            backgroundColor: "#f5f5f5",
            padding: "0.75rem",
            textAlign: "left",
            fontWeight: 700,
            borderBottom: "2px solid #e0e0e0",
            color: "#212121",
          },
          "& td": {
            padding: "0.75rem",
            borderBottom: "1px solid #e0e0e0",
            color: "#424242",
          },
          "& tr:hover": {
            backgroundColor: "#fafafa",
          },
        },
        "& hr": {
          border: "none",
          borderTop: "2px solid #e0e0e0",
          my: 3,
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {body}
      </ReactMarkdown>
    </Box>
  );
}

// export default function BlogContent({ post }) {
//   return (
//     <div className="blog-content">
//       <h1>{post.frontmatter.title}</h1>
//       <p className="blog-meta">{post.frontmatter.description}</p>
//       <small>{post.frontmatter.date}</small>
//       <hr />
//       <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
//     </div>
//   );
// }
