import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  Grid,
  Alert,
  LinearProgress,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { siteConfig, apiEndpoints } from "../site.config";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!formData.subject.trim()) {
      setError("Please enter a subject");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message");
      return;
    }

    setSending(true);

    try {
      const body = new FormData();
      body.append("name", formData.name.trim());
      body.append("email", formData.email.trim());
      body.append("phone", formData.phone.trim());
      body.append("subject", formData.subject.trim());
      body.append("message", formData.message.trim());

      const response = await fetch(apiEndpoints.contact, {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!response.ok || result.status !== "success") {
        throw new Error(result.message || "Failed to send message");
      }

      setSuccessMessage(result.message || "Thank you! Your message has been sent successfully.");
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
        setSuccessMessage("");
      }, 8000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: "2rem", color: "#ff4a17" }} />,
      label: "Email",
      value: siteConfig.email,
      link: `mailto:${siteConfig.email}`,
    },
    {
      icon: <PhoneIcon sx={{ fontSize: "2rem", color: "#ff4a17" }} />,
      label: "Phone",
      value: siteConfig.phones[0],
      link: `tel:${siteConfig.primaryPhone}`,
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: "2rem", color: "#ff4a17" }} />,
      label: "Location",
      value: siteConfig.location,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact — {siteConfig.blogName}</title>
        <meta
          name="description"
          content={`Get in touch with ${siteConfig.teamName}. We'd love to hear from you.`}
        />
      </Helmet>

      <Box sx={{ width: "100%" }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#212121",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#757575",
              fontSize: "1.1rem",
              fontWeight: 300,
            }}
          >
            Have questions or feedback? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  {info.icon}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mt: 2,
                      mb: 1,
                      color: "#212121",
                    }}
                  >
                    {info.label}
                  </Typography>
                  {info.link ? (
                    <a
                      href={info.link}
                      style={{
                        color: "#1976d2",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#757575",
                        fontWeight: 500,
                      }}
                    >
                      {info.value}
                    </Typography>
                  )}
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: "12px",
              }}
            >
              {submitted && (
                <Alert
                  severity="success"
                  sx={{ mb: 3, fontWeight: 600 }}
                  onClose={() => setSubmitted(false)}
                >
                  {successMessage || "Thank you! Your message has been sent successfully. We'll get back to you soon!"}
                </Alert>
              )}

              {error && (
                <Alert
                  severity="error"
                  sx={{ mb: 3, fontWeight: 600 }}
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        variant="outlined"
                        disabled={sending}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        variant="outlined"
                        disabled={sending}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+256 7XX XXX XXX"
                    variant="outlined"
                    disabled={sending}
                  />

                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    variant="outlined"
                    disabled={sending}
                  />

                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your thoughts..."
                    multiline
                    rows={5}
                    variant="outlined"
                    disabled={sending}
                  />

                  {sending && <LinearProgress />}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    disabled={sending}
                    sx={{
                      background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 700,
                      transition: "all 0.3s ease",
                      "&:hover:not(:disabled)": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
                      },
                      "&:disabled": {
                        opacity: 0.7,
                      },
                    }}
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                </Stack>
              </form>
            </Card>
          </Grid>
        </Grid>

        {/* FAQ or Additional Info */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#212121",
              textAlign: "center",
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                q: "How long does it take to get a response?",
                a: "We typically respond to inquiries within 24-48 hours during business days.",
              },
              {
                q: "Can I subscribe to the blog?",
                a: "Yes! Check out our blog page for subscription options and follow us on social media.",
              },
              {
                q: "Do you accept guest posts?",
                a: 'We love guest contributions! Please include "Guest Post" in your subject line.',
              },
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    borderLeft: "4px solid #1976d2",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#212121",
                    }}
                  >
                    {faq.q}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#757575",
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.a}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}