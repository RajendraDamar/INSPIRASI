import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '../Button.web';

type ButtonProps = React.ComponentProps<typeof Button>;

export default {
  title: 'Button',
  component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>{args.children}</Button>;

export const Primary = Template.bind({});
Primary.args = { children: 'Primary Button' };
