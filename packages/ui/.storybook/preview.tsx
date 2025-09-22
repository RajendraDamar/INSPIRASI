import React from 'react';
import '../src/styles.css';
import ThemeProvider from '../src/ThemeProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' }
      ]
    }
  }
};

export const decorators = [
  (Story: any, context: any) => {
    const theme = (context.globals?.theme || 'light') as 'light' | 'dark';
    return (
      <ThemeProvider initial={theme}>
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    );
  }
];
