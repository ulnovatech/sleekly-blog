import { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Stack,
  Avatar,
  Paper,
  Rating,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";

export default function Comments({ slug }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Jane Doe",
      email: "jane@example.com",
      text: "Great article! Very informative and well-written. Looking forward to more content like this.",
      rating: 5,
      timestamp: new Date("2024-03-20"),
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@example.com",
      text: "Thanks for sharing this. Really helped me understand the topic better.",
      rating: 4,
      timestamp: new Date("2024-03-19"),
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: "",
    rating: 5,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (_, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.text.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newComment = {
      id: comments.length + 1,
      ...formData,
      timestamp: new Date(),
    };

    setComments((prev) => [newComment, ...prev]);
    setFormData({
      name: "",
      email: "",
      text: "",
      rating: 5,
    });
  };

  return (
    <Box sx={{ my: 6 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 4,
          color: "#212121",
        }}
      >
        Comments & Feedback
      </Typography>

      {/* Comment Form */}
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "12px",
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              variant="outlined"
              size="small"
            />
          </Box>

          <TextField
            fullWidth
            label="Your Comment"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Share your thoughts about this article..."
            multiline
            rows={4}
            variant="outlined"
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#424242" }}>
              Rating:
            </Typography>
            <Rating
              value={formData.rating}
              onChange={handleRatingChange}
              size="large"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            size="large"
            sx={{
              alignSelf: "flex-start",
              background: "linear-gradient(135deg, #15656f 0%, #0b343c 100%)",
              fontWeight: 600,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            Post Comment
          </Button>
        </Stack>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Comments List */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "#212121",
        }}
      >
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </Typography>

      <Stack spacing={3}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Paper
              key={comment.id}
              sx={{
                p: 3,
                borderRadius: "12px",
                backgroundColor: "#fafafa",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              {/* Comment Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#15656f",
                    width: 40,
                    height: 40,
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: "#212121",
                    }}
                  >
                    {comment.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9e9e9e",
                    }}
                  >
                    {comment.timestamp.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
                <Rating value={comment.rating} readOnly size="small" />
              </Box>

              {/* Comment Text */}
              <Typography
                variant="body2"
                sx={{
                  color: "#424242",
                  lineHeight: 1.6,
                }}
              >
                {comment.text}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments yet. Be the first to share your thoughts!
          </Typography>
        )}
      </Stack>
    </Box>
  );
}