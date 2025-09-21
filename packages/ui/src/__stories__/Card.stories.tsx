import React from 'react';
import { Meta, Story } from '@storybook/react';
import Card from '../Card.web';

export default {
  title: 'Card',
  component: Card
} as Meta;

export const Variants: Story = () => (
  <div style={{ padding: 16 }}>
    <h4>Current Theme</h4>
    <Card>Card content</Card>
  </div>
);

export const Light = Variants.bind({});
Light.parameters = { globals: { theme: 'light' } };

export const Dark = Variants.bind({});
Dark.parameters = { globals: { theme: 'dark' } };
