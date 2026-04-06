import { Box } from '@mui/material';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';

export const metadata = {
  title: 'ChatFlow - AI Chat Platform',
  description: 'Build, deploy, and scale your AI agents with ChatFlow',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
