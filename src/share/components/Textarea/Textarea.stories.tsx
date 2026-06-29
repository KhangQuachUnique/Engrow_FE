import type { Meta, StoryObj } from "@storybook/react-vite";
import Textarea from "./Textarea";

const meta = {
  title: "Share/Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    id: "essay",
    label: "Writing sample",
    placeholder: "Paste your paragraph here",
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    action: (
      <a href="#tips" onClick={(event) => event.preventDefault()}>
        View tips
      </a>
    ),
  },
};

export const WithError: Story = {
  args: {
    error: "Writing sample is required",
  },
};
