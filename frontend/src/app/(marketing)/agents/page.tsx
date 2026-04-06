'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BuildIcon from '@mui/icons-material/Build';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const agentTypes = [
  {
    name: 'Support Agent',
    description: 'Handle customer inquiries 24/7 with human-like responses',
    icon: SmartToyIcon,
    color: '#4CAF50',
    features: ['Ticket Management', 'Knowledge Base', 'Sentiment Analysis'],
  },
  {
    name: 'Sales Agent',
    description: 'Qualify leads and guide prospects through your funnel',
    icon: RocketLaunchIcon,
    color: '#2196F3',
    features: ['Lead Scoring', 'CRM Integration', 'Follow-up Automation'],
  },
  {
    name: 'Custom Agent',
    description: 'Build your own AI agent tailored to your specific needs',
    icon: BuildIcon,
    color: '#9C27B0',
    features: ['Custom Training', 'API Access', 'Workflow Builder'],
  },
];

const steps = ['Design', 'Train', 'Deploy', 'Monitor'];

export default function AgentsPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <SmartToyIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
            AI Agents
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 4 }}>
            Deploy intelligent agents that work for you around the clock
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: 'success.main',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Create Agent
          </Button>
        </Container>
      </Box>

      {/* How it Works */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 4, fontWeight: 600 }}>
          How It Works
        </Typography>
        <Stepper activeStep={-1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>

      {/* Agent Types */}
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 6, fontWeight: 600 }}>
          Choose Your Agent
        </Typography>
        <Grid container spacing={4}>
          {agentTypes.map((agent) => (
            <Grid item xs={12} md={4} key={agent.name}>
              <Card
                sx={{
                  height: '100%',
                  borderTop: `4px solid ${agent.color}`,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <agent.icon sx={{ fontSize: 40, color: agent.color }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {agent.name}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {agent.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {agent.features.map((feature) => (
                      <Chip
                        key={feature}
                        label={feature}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: agent.color, color: agent.color }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
