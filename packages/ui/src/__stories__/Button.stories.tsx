import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '../Button.web';
import ThemeProvider from '../ThemeProvider';

type ButtonProps = React.ComponentProps<typeof Button>;

export default {
  title: 'Button',
  component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>{args.children}</Button>;

export const Primary = Template.bind({});
Primary.args = { children: 'Primary Button' };

export const Themed = (args: ButtonProps) => (
  <>
    <ThemeProvider initial="light">
      <div style={{ padding: 16 }}>
        <h4>Light</h4>
        <Button {...args}>Light Button</Button>
      </div>
    </ThemeProvider>
    <ThemeProvider initial="dark">
      <div style={{ padding: 16 }}>
        <h4>Dark</h4>
        <Button {...args}>Dark Button</Button>
      </div>
    </ThemeProvider>
  </>
);
