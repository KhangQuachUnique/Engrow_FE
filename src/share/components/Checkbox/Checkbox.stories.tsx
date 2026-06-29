import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./Checkbox";

const meta = {
  title: "Share/Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    id: "terms",
    label: "I agree to the terms",
    description: "You can review these settings again from your account.",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    error: "Please accept before continuing",
  },
};
