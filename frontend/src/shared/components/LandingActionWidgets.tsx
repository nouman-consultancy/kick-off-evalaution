'use client';

import { Box, Paper, Typography } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MovieIcon from '@mui/icons-material/Movie';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import InsightsIcon from '@mui/icons-material/Insights';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StyleIcon from '@mui/icons-material/Style';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import TranslateIcon from '@mui/icons-material/Translate';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

interface ActionWidgetItem {
  title: string;
  icon: React.ElementType;
}

const actionItems: ActionWidgetItem[] = [
  { title: 'Create image', icon: PaletteIcon },
  { title: 'Generate Audio', icon: MusicNoteIcon },
  { title: 'Create video', icon: MovieIcon },
  { title: 'Create slides', icon: SlideshowIcon },
  { title: 'Create Infographs', icon: InsightsIcon },
  { title: 'Create quiz', icon: HelpOutlineIcon },
  { title: 'Create Flashcards', icon: StyleIcon },
  { title: 'Create Mind map', icon: AccountTreeIcon },
  { title: 'Analyze Data', icon: AnalyticsIcon },
  { title: 'Write content', icon: EditNoteIcon },
  { title: 'Code Generation', icon: CodeIcon },
  { title: 'Document Analysis', icon: DescriptionIcon },
  { title: 'Translate', icon: TranslateIcon },
  { title: 'Just Exploring', icon: TravelExploreIcon },
];

export default function LandingActionWidgets() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          sm: 'repeat(3, minmax(0, 1fr))',
          md: 'repeat(4, minmax(0, 1fr))',
          lg: 'repeat(7, minmax(0, 1fr))',
        },
        gap: 1.5,
      }}
    >
      {actionItems.map((item) => (
        <Box key={item.title}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              px: 1.5,
              py: 1.25,
              border: '1px solid rgba(255,255,255,0.35)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minHeight: 54,
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <item.icon sx={{ fontSize: 17, color: '#5f6368' }} />
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: '#2f3133',
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {item.title}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
}
