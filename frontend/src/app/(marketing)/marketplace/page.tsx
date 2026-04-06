'use client';

import { useState, useCallback } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, Chip,
  TextField, InputAdornment, Checkbox, FormControlLabel, Slider,
  Drawer, IconButton, Button, Divider, Rating, Skeleton, useMediaQuery, useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useGetMarketplaceModelsQuery, MarketplaceFilters } from '@/appstore/api/modelsApi';
import { useGetLabsQuery } from '@/appstore/api/labsApi';
import CommonErrorState from '@/shared/components/CommonErrorState';
import CommonNoDataState from '@/shared/components/CommonNoDataState';

// ─── constants ────────────────────────────────────────────────────────────────

const CATEGORY_TABS = ['All', 'Language', 'Vision', 'Code', 'Image Gen', 'Audio', 'Open Source'];

const PROVIDERS = [
  'OpenAI', 'Anthropic', 'Google DeepMind', 'Meta (Llama)',
  'DeepSeek', 'Alibaba (Qwen)', 'xAI (Grok)', 'Mistral AI', 'Cohere',
];

const PRICING_OPTIONS = ['Pay-per-use', 'Subscription', 'Free tier', 'Enterprise'];

const RATING_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '4+', value: 4 },
  { label: '4.5+', value: 4.5 },
];

// ─── model card ───────────────────────────────────────────────────────────────

function ModelCard({ model }: { model: any }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: '1px solid #eceef3',
        boxShadow: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.10)' },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        {/* header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {model.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={model.iconUrl} alt={model.name} width={36} height={36}
                style={{ borderRadius: 8, objectFit: 'contain', flexShrink: 0 }} />
            ) : (
              <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'primary.light',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ExtensionIcon sx={{ fontSize: 20, color: 'primary.main' }} />
              </Box>
            )}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {model.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">{model.provider}</Typography>
            </Box>
          </Box>
          {model.badge && (
            <Chip
              label={model.badge}
              size="small"
              sx={{
                height: 20, fontSize: 11, fontWeight: 700,
                bgcolor: model.badge === 'Hot' ? '#fff0ee' : '#eefff4',
                color: model.badge === 'Hot' ? '#e53935' : '#2e7d32',
                border: 'none',
              }}
            />
          )}
        </Box>

        {/* description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: 13, lineHeight: 1.5 }}>
          {model.description}
        </Typography>

        {/* tags */}
        {model.tags?.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
            {model.tags.slice(0, 3).map((tag: string) => (
              <Chip key={tag} label={tag} size="small"
                sx={{ height: 22, fontSize: 11, bgcolor: '#f0f2ff', color: '#3d52d5', border: 'none' }} />
            ))}
          </Box>
        )}

        {/* footer */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {model.rating?.toFixed(1) ?? 'N/A'}
            </Typography>
            {model.reviewCount && (
              <Typography variant="caption" color="text.disabled">
                ({model.reviewCount >= 1000
                  ? `${(model.reviewCount / 1000).toFixed(1)}K`
                  : model.reviewCount})
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {model.pricePerMToken && (
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {model.pricePerMToken}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.3 }}>
              How to Use <ArrowForwardIcon sx={{ fontSize: 12 }} />
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── loading skeletons ────────────────────────────────────────────────────────

function ModelCardSkeleton() {
  return (
    <Card sx={{ borderRadius: 3, border: '1px solid #eceef3', boxShadow: 'none', p: 2.5 }}>
      <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
        <Skeleton variant="rounded" width={36} height={36} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="60%" height={18} />
          <Skeleton width="40%" height={14} />
        </Box>
      </Box>
      <Skeleton width="100%" height={14} />
      <Skeleton width="80%" height={14} sx={{ mb: 1.5 }} />
      <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
        <Skeleton variant="rounded" width={60} height={22} />
        <Skeleton variant="rounded" width={60} height={22} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton width="30%" height={14} />
        <Skeleton width="25%" height={14} />
      </Box>
    </Card>
  );
}

// ─── sidebar filters ──────────────────────────────────────────────────────────

interface SidebarProps {
  providers: string[];
  pricingModel: string[];
  maxPrice: number;
  minRating: number;
  onProviderToggle: (p: string) => void;
  onPricingToggle: (p: string) => void;
  onMaxPriceChange: (v: number) => void;
  onMinRatingChange: (v: number) => void;
  onReset: () => void;
}

function SidebarFilters({
  providers, pricingModel, maxPrice, minRating,
  onProviderToggle, onPricingToggle, onMaxPriceChange, onMinRatingChange, onReset,
}: SidebarProps) {
  return (
    <Box sx={{ width: 220, flexShrink: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 13, color: 'text.secondary', letterSpacing: 0.5 }}>
          AI LABS
        </Typography>
      </Box>

      {/* All Labs chip */}
      <Chip
        label={`All Labs`}
        size="small"
        icon={<ExtensionIcon sx={{ fontSize: '14px !important' }} />}
        sx={{ mb: 2, bgcolor: '#3d52d5', color: '#fff', fontWeight: 600,
          '& .MuiChip-icon': { color: '#fff' } }}
      />

      <Divider sx={{ mb: 2 }} />

      {/* Provider */}
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 0.5, display: 'block', mb: 1 }}>
        PROVIDER
      </Typography>
      {PROVIDERS.map((p) => (
        <FormControlLabel
          key={p}
          control={
            <Checkbox
              size="small"
              checked={providers.includes(p)}
              onChange={() => onProviderToggle(p)}
              sx={{ py: 0.3 }}
            />
          }
          label={<Typography variant="body2" sx={{ fontSize: 13 }}>{p}</Typography>}
          sx={{ display: 'flex', ml: 0, mb: 0.2 }}
        />
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Pricing model */}
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 0.5, display: 'block', mb: 1 }}>
        PRICING MODEL
      </Typography>
      {PRICING_OPTIONS.map((p) => (
        <FormControlLabel
          key={p}
          control={
            <Checkbox
              size="small"
              checked={pricingModel.includes(p)}
              onChange={() => onPricingToggle(p)}
              sx={{ py: 0.3 }}
            />
          }
          label={<Typography variant="body2" sx={{ fontSize: 13 }}>{p}</Typography>}
          sx={{ display: 'flex', ml: 0, mb: 0.2 }}
        />
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Max price slider */}
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 0.5, display: 'block', mb: 1 }}>
        MAX PRICE /1M TOKENS
      </Typography>
      <Slider
        value={maxPrice}
        min={0} max={100} step={1}
        onChange={(_, v) => onMaxPriceChange(v as number)}
        sx={{ color: '#e53935', mb: 0.5 }}
      />
      <Typography variant="caption" color="text.secondary">
        Up to ${maxPrice === 100 ? '100+' : maxPrice}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Min rating */}
      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 0.5, display: 'block', mb: 1 }}>
        MIN RATING
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {RATING_OPTIONS.map((r) => (
          <Chip
            key={r.label}
            label={r.label === 'Any' ? 'Any' : <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>{r.label} <StarIcon sx={{ fontSize: 12 }} /></Box>}
            size="small"
            onClick={() => onMinRatingChange(r.value)}
            sx={{
              cursor: 'pointer', fontSize: 12,
              bgcolor: minRating === r.value ? '#3d52d5' : '#f0f2ff',
              color: minRating === r.value ? '#fff' : '#3d52d5',
            }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />
      <Button size="small" onClick={onReset} sx={{ fontSize: 12 }}>Reset filters</Button>
    </Box>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // filter state
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<string>('All Labs');

  // debounce search
  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout((handleSearchChange as any)._t);
    (handleSearchChange as any)._t = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 400);
  };

  const handleProviderToggle = useCallback((p: string) => {
    setSelectedProviders((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
    setPage(1);
  }, []);

  const handlePricingToggle = useCallback((p: string) => {
    setSelectedPricing((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
    setPage(1);
  }, []);

  const handleReset = () => {
    setSearch(''); setDebouncedSearch(''); setCategory('All');
    setSelectedProviders([]); setSelectedPricing([]);
    setMaxPrice(100); setMinRating(0); setPage(1); setSelectedLab('All Labs');
  };

  // labs
  const { data: labsData } = useGetLabsQuery({ page: 1, limit: 100 });
  const labs = labsData?.data ?? [];

  // build filters — if a lab is selected, override providers
  const activeProviders = selectedLab !== 'All Labs'
    ? [selectedLab]
    : selectedProviders;

  const filters: MarketplaceFilters = {
    page,
    limit: 12,
    search: debouncedSearch || undefined,
    providers: activeProviders.length ? activeProviders : undefined,
    category: category !== 'All' ? category : undefined,
    minRating: minRating > 0 ? minRating : undefined,
    maxPrice: maxPrice < 100 ? maxPrice : undefined,
    pricingModel: selectedPricing.length ? selectedPricing : undefined,
  };

  const { data, isLoading, isFetching, isError } = useGetMarketplaceModelsQuery(filters);
  const models = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 12);

  const sidebarContent = (
    <SidebarFilters
      providers={selectedProviders}
      pricingModel={selectedPricing}
      maxPrice={maxPrice}
      minRating={minRating}
      onProviderToggle={handleProviderToggle}
      onPricingToggle={handlePricingToggle}
      onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
      onMinRatingChange={(v) => { setMinRating(v); setPage(1); }}
      onReset={handleReset}
    />
  );

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* ── top bar ── */}
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #eceef3', px: { xs: 2, md: 4 }, py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
            Model Marketplace
          </Typography>

          {/* search */}
          <TextField
            size="small"
            placeholder="Search models, capabilities..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: 260 }, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />

          {/* category tabs */}
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', flex: 1 }}>
            {CATEGORY_TABS.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                size="small"
                onClick={() => { setCategory(cat); setPage(1); }}
                sx={{
                  cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  bgcolor: category === cat ? '#3d52d5' : 'transparent',
                  color: category === cat ? '#fff' : 'text.secondary',
                  border: category === cat ? 'none' : '1px solid #eceef3',
                  '&:hover': { bgcolor: category === cat ? '#3d52d5' : '#f0f2ff' },
                }}
              />
            ))}
          </Box>

          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} size="small">
              <FilterListIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* ── lab tabs row ── */}
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #eceef3', px: { xs: 2, md: 4 }, py: 1 }}>
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5,
          '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { borderRadius: 2, bgcolor: '#ddd' } }}>
          {/* All Labs */}
          <Chip
            label="All Labs"
            size="small"
            icon={<ExtensionIcon sx={{ fontSize: '14px !important' }} />}
            onClick={() => { setSelectedLab('All Labs'); setPage(1); }}
            sx={{
              whiteSpace: 'nowrap', cursor: 'pointer', fontWeight: 600,
              bgcolor: selectedLab === 'All Labs' ? '#3d52d5' : '#f0f2ff',
              color: selectedLab === 'All Labs' ? '#fff' : '#3d52d5',
              '& .MuiChip-icon': { color: selectedLab === 'All Labs' ? '#fff' : '#3d52d5' },
            }}
          />
          {labs.map((lab) => (
            <Chip
              key={lab.id}
              label={`${lab.name}`}
              size="small"
              onClick={() => { setSelectedLab(lab.name); setPage(1); }}
              sx={{
                whiteSpace: 'nowrap', cursor: 'pointer', fontWeight: 500,
                bgcolor: selectedLab === lab.name ? '#3d52d5' : 'transparent',
                color: selectedLab === lab.name ? '#fff' : 'text.secondary',
                border: selectedLab === lab.name ? 'none' : '1px solid #eceef3',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ── body ── */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          {/* sidebar — desktop */}
          {!isMobile && (
            <Box sx={{ position: 'sticky', top: 80 }}>
              {sidebarContent}
            </Box>
          )}

          {/* mobile drawer */}
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ p: 3, width: 260 }}>
              {sidebarContent}
            </Box>
          </Drawer>

          {/* grid */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* result count */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {isLoading ? 'Loading...' : `${total} models found`}
            </Typography>

            {isError ? (
              <CommonErrorState title="Failed to load models" description="Could not fetch models. Please try again." />
            ) : !isLoading && !isFetching && models.length === 0 ? (
              <CommonNoDataState title="No models found" description="Try adjusting your filters or search query." />
            ) : (
              <Grid container spacing={2}>
                {(isLoading || isFetching)
                  ? Array.from({ length: 12 }).map((_, i) => (
                      <Grid item xs={12} sm={6} lg={4} xl={3} key={i}>
                        <ModelCardSkeleton />
                      </Grid>
                    ))
                  : models.map((model) => (
                      <Grid item xs={12} sm={6} lg={4} xl={3} key={model.id}>
                        <ModelCard model={model} />
                      </Grid>
                    ))
                }
              </Grid>
            )}

            {/* pagination */}
            {totalPages > 1 && !isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
                <Button
                  size="small" variant="outlined" disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <Typography variant="body2" sx={{ alignSelf: 'center', px: 1 }}>
                  Page {page} of {totalPages}
                </Typography>
                <Button
                  size="small" variant="outlined" disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
