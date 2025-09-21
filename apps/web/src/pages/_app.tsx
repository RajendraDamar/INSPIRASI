import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Header from '../components/Header';
import { AuthProvider } from '../lib/auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
