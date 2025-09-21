import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '../Button.web';
// ThemeProvider is applied globally via Storybook decorator

type ButtonProps = React.ComponentProps<typeof Button>;

export default {
  title: 'Button',
  component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>{args.children}</Button>;

export const Primary = Template.bind({});
Primary.args = { children: 'Primary Button' };

export const Themed: Story<ButtonProps> = (args) => (
  <>
    <div style={{ padding: 16 }}>
      <h4>Current Theme</h4>
      <Button {...args}>Themed Button</Button>
    </div>
  </>
);

// Example stories that override the global toolbar control to force a specific theme
export const Light = Themed.bind({});
Light.parameters = { globals: { theme: 'light' } };

export const Dark = Themed.bind({});
Dark.parameters = { globals: { theme: 'dark' } };
