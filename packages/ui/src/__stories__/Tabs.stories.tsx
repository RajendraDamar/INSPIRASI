import React from 'react';
import { Meta } from '@storybook/react';
import Tabs from '../Tabs.web';
import { Story } from '@storybook/react';

export default {
  title: 'Tabs',
  component: Tabs
} as Meta;

export const Variants: Story = () => (
  <div style={{ padding: 16 }}>
    <h4>Current Theme</h4>
    <Tabs tabs={["One", "Two", "Three"]} />
  </div>
);

export const Light = Variants.bind({});
Light.parameters = { globals: { theme: 'light' } };

export const Dark = Variants.bind({});
Dark.parameters = { globals: { theme: 'dark' } };
