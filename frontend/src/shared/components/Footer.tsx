'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const footerLinks = {
  product: [
    { label: 'Chat Hub', href: '/chat-hub' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Agents', href: '/agents' },
    { label: 'Discover Now', href: '/discover' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Community', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0a1628',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ChatBubbleOutlineIcon sx={{ color: 'primary.light', fontSize: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ChatFlow
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 3,
                maxWidth: 300,
                lineHeight: 1.7,
              }}
            >
              Empowering businesses with intelligent AI agents and seamless chat experiences.
              Build, deploy, and scale your AI solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Product Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.product.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': { color: 'primary.light' },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.company.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': { color: 'primary.light' },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Resources Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.resources.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': { color: 'primary.light' },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': { color: 'primary.light' },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            © {currentYear} ChatFlow. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Privacy
              </Typography>
            </Link>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Terms
              </Typography>
            </Link>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                Cookies
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
