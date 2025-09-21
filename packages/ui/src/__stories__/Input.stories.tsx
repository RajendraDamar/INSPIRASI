import React from 'react';
import { Meta } from '@storybook/react';
import Input from '../Input.web';
import { Story } from '@storybook/react';

export default {
  title: 'Input',
  component: Input
} as Meta;

export const Variants: Story = () => (
  <div style={{ padding: 16 }}>
    <h4>Current Theme</h4>
    <Input placeholder="Type here" />
  </div>
);

export const Light = Variants.bind({});
Light.parameters = { globals: { theme: 'light' } };

export const Dark = Variants.bind({});
Dark.parameters = { globals: { theme: 'dark' } };
