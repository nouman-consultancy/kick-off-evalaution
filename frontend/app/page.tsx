import { Box, Container } from "@mui/material";
import LandingHero from "@/components/LandingHero";
import FeaturedModelsSection from "@/components/FeaturedModelsSection";
import BuilderFeaturesSection from "@/components/BuilderFeaturesSection";
import LabsSection from "@/components/LabsSection";
import ComparisonSection from "@/components/ComparisonSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Box>
      <Container maxWidth="lg">
        <LandingHero />
        <FeaturedModelsSection />
        <BuilderFeaturesSection />
        <LabsSection />
        <ComparisonSection />
      </Container>
      <Footer />
    </Box>
  );
}
