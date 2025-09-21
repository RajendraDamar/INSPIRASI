import React from 'react';
import { Meta } from '@storybook/react';
import ThemeProvider from '../ThemeProvider';
import Card from '../Card.web';

export default {
  title: 'Card',
  component: Card
} as Meta;

export const Variants = () => (
  <>
    <ThemeProvider initial="light">
      <div style={{ padding: 16 }}>
        <h4>Light</h4>
        <Card>Light card content</Card>
      </div>
    </ThemeProvider>
    <ThemeProvider initial="dark">
      <div style={{ padding: 16 }}>
        <h4>Dark</h4>
        <Card>Dark card content</Card>
      </div>
    </ThemeProvider>
  </>
);
