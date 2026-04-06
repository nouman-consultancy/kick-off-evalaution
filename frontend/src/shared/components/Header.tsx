'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const menuItems = [
  { label: 'Chat Hub', href: '/chat-hub' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Agents', href: '/agents' },
  { label: 'Discover Now', href: '/discover' },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            minHeight: '72px',
          }}
          disableGutters
        >
          {/* Logo - Left */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ChatBubbleOutlineIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.5px',
                }}
              >
                ChatFlow
              </Typography>
            </Link>
          </Box>

          {/* Menu Items - Center */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              flex: '1 1 auto',
            }}
          >
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{
                    color: isActive(item.href) ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive(item.href) ? 600 : 500,
                    fontSize: '0.95rem',
                    position: 'relative',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: isActive(item.href) ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.2s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* Buttons - Right */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: '0 0 auto' }}>
            <Button
              component={Link}
              href="/login"
              variant="text"
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.95rem',
              }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              href="/register"
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.95rem',
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                },
              }}
            >
              Try Free
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
