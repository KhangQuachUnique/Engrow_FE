import type { Meta, StoryObj } from "@storybook/react-vite";
import Select from "./Select";

const OPTIONS = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
] as const;

const meta = {
  title: "Share/Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    id: "level",
    label: "English level",
    options: OPTIONS,
    placeholder: "Choose a level",
    defaultValue: "",
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "Please choose your level",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
