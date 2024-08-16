'use client'; // Indicates this is a Client Component

import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

// Create a Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Layout component
const Layout = ({ children }) => {
  const { pathname } = useRouter(); // Adjusted usage for navigation

  return (
    <>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="A Next.js application with Material-UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <html lang="en">
        <body>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default Layout;
