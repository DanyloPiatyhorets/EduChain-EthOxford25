import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from 'next/link';
import Image from "next/image";

// Styled components
const GradientTypography = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  textAlign: "center",
}));

const LogoBox = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius * 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[4],
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[8],
  },
}));

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Card elevation={0} sx={{ bgcolor: "transparent" }}>
          <CardContent sx={{ py: { xs: 8, md: 6 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Logo */}
              <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: 100, height: 100, position: "relative" }}>
                  <Image
                    src="/logo.png" // Ensure this path is correct
                    alt="SE2 logo"
                    layout="fill"
                    objectFit="contain" // Ensures the image scales well
                  />
                </Box>
              </Box>

              {/* Title */}
              <GradientTypography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                EduChain
              </GradientTypography>

              {/* Description */}
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  maxWidth: "md",
                  mb: 4,
                  mx: "auto",
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                }}
              >
                Get your credentials verified and securely stored on-chain
              </Typography>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Link href="/mycertificates" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      minWidth: { xs: "100%", sm: 200 },
                    }}
                  >
                    View my certificates
                  </Button>
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Hero;
