import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThreeFluidFxHelloWorld } from './Demo';

const meta: Meta<typeof ThreeFluidFxHelloWorld> = {
  title: '3D / three-fluid-fx / HelloWorld',
  component: ThreeFluidFxHelloWorld,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ThreeFluidFxHelloWorld>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '100vw', height: '100svh' }}>
      <ThreeFluidFxHelloWorld />
    </div>
  ),
};
