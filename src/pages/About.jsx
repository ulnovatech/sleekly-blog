import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import { siteConfig } from "../site.config";

export default function About() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & Lead Writer",
      bio: "Tech enthusiast with 10+ years of experience in web development.",
    },
    {
      name: "Sarah Chen",
      role: "Content Editor",
      bio: "Expert in tech communication and digital marketing strategies.",
    },
    {
      name: "Mike Davis",
      role: "Tech Analyst",
      bio: "Specializes in emerging technologies and industry trends.",
    },
    {
      name: "Emma Wilson",
      role: "Community Manager",
      bio: "Passionate about building engaged communities around tech topics.",
    },
  ];

  const values = [
    {
      icon: <LightbulbIcon />,
      title: "Innovation",
      description: "We stay at the forefront of technology and share cutting-edge insights.",
    },
    {
      icon: <CheckCircleOutlineIcon />,
      title: "Quality",
      description: "Every article is thoroughly researched and carefully crafted.",
    },
    {
      icon: <GroupIcon />,
      title: "Community",
      description: "We foster a welcoming community of learners and innovators.",
    },
    {
      icon: <SchoolIcon />,
      title: "Education",
      description: "Making tech knowledge accessible to everyone.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About — {siteConfig.blogName}</title>
        <meta name="description" content={`Learn about ${siteConfig.blogName} and the ${siteConfig.teamName}.`} />
      </Helmet>

      <Box sx={{ width: "100%" }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            color: "white",
            py: { xs: 4, sm: 6, md: 8 },
            mb: 6,
            borderRadius: "12px",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            About {siteConfig.blogName}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 300,
              opacity: 0.95,
            }}
          >
            Empowering tech enthusiasts with knowledge, insights, and stories from the
            digital frontier.
          </Typography>
        </Box>

        {/* Mission Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#212121",
                }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#424242",
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                {siteConfig.blogName} shares the latest insights, tutorials, and industry
                news across technology, web development, agriculture, and digital innovation. Our
                team of experts shares knowledge to help you stay ahead in the fast-paced tech world.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#424242",
                  lineHeight: 1.8,
                }}
              >
                Founded in 2023, we aim to foster a vibrant community of learners, innovators, and
                tech enthusiasts who are passionate about shaping the future through technology.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 4,
                background: "linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 100%)",
                borderRadius: "12px",
                border: "1px solid #1976d2",
              }}
            >
              <Stack spacing={2}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <EmojiEventsIcon sx={{ color: "#1976d2", fontSize: "2rem", mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#212121" }}>
                      Award-Winning Content
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Recognized for high-quality content and community impact.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <GroupIcon sx={{ color: "#1976d2", fontSize: "2rem", mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#212121" }}>
                      Growing Community
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Join thousands of readers passionate about technology.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <SchoolIcon sx={{ color: "#1976d2", fontSize: "2rem", mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#212121" }}>
                      Free Knowledge
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quality tech education accessible to everyone.
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Core Values */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#212121",
              textAlign: "center",
            }}
          >
            Our Core Values
          </Typography>
          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "2.5rem",
                      mb: 2,
                      color: "#1976d2",
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "#212121",
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#757575",
                      lineHeight: 1.6,
                    }}
                  >
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#212121",
              textAlign: "center",
            }}
          >
            Meet Our Team
          </Typography>
          <Grid container spacing={3}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      bgcolor: "#1976d2",
                      fontSize: "2rem",
                    }}
                  >
                    {member.name.charAt(0)}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#212121",
                      mb: 0.5,
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#1976d2",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#757575",
                      lineHeight: 1.5,
                    }}
                  >
                    {member.bio}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Subscribe CTA */}
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            color: "white",
            borderRadius: "12px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Stay Updated
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              opacity: 0.95,
            }}
          >
            Subscribe to our newsletter and get the latest articles delivered to your inbox.
          </Typography>
        </Card>
      </Box>
    </>
  );
}