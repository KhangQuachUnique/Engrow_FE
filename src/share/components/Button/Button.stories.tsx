import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import Button from "./Button";

const meta = {
  title: "Share/Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Continue",
    className: "px-5 py-3",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    children: "Cancel",
    variant: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    loadingText: "Saving",
  },
};

export const LinkButton: Story = {
  args: {
    children: "Go home",
    to: "/",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
