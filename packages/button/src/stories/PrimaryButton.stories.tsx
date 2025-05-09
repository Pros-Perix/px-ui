import type { Meta, StoryObj } from '@storybook/react';
import { PrimaryButton } from '../components/PrimaryButton';

const meta: Meta<typeof PrimaryButton> = {
  component: PrimaryButton,
  title: 'Components/PrimaryButton',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof PrimaryButton> = {
  args: {
    children: 'Click Me',
  },
};
