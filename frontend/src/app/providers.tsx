'use client';

import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReduxProvider } from '@/appstore/ReduxProvider';
import i18n from '@/shared/i18n/i18n';
import theme from '@/shared/lib/theme';

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ReduxProvider>
    </I18nextProvider>
  );
}
