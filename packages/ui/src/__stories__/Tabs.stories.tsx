import React from 'react';
import { Meta } from '@storybook/react';
import ThemeProvider from '../ThemeProvider';
import Tabs from '../Tabs.web';

export default {
  title: 'Tabs',
  component: Tabs
} as Meta;

export const Variants = () => (
  <>
    <ThemeProvider initial="light">
      <div style={{ padding: 16 }}>
        <h4>Light</h4>
        <Tabs tabs={["One", "Two", "Three"]} />
      </div>
    </ThemeProvider>
    <ThemeProvider initial="dark">
      <div style={{ padding: 16 }}>
        <h4>Dark</h4>
        <Tabs tabs={["One", "Two", "Three"]} />
      </div>
    </ThemeProvider>
  </>
);
