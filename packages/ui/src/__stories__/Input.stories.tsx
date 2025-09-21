import React from 'react';
import { Meta } from '@storybook/react';
import ThemeProvider from '../ThemeProvider';
import Input from '../Input.web';

export default {
  title: 'Input',
  component: Input
} as Meta;

export const Variants = () => (
  <>
    <ThemeProvider initial="light">
      <div style={{ padding: 16 }}>
        <h4>Light</h4>
        <Input placeholder="Type here" />
      </div>
    </ThemeProvider>
    <ThemeProvider initial="dark">
      <div style={{ padding: 16 }}>
        <h4>Dark</h4>
        <Input placeholder="Type here" />
      </div>
    </ThemeProvider>
  </>
);
