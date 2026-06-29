import type { Meta, StoryObj } from "@storybook/react-vite";
import { FiMail } from "react-icons/fi";
import Input from "./Input";

const meta = {
  title: "Share/Components/Input",
  component: Input,
  args: {
    id: "email",
    label: "Email",
    placeholder: "you@example.com",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: FiMail,
  },
};

export const WithAction: Story = {
  args: {
    action: (
      <a href="#forgot" onClick={(event) => event.preventDefault()}>
        Forgot?
      </a>
    ),
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
};

export const WithError: Story = {
  args: {
    error: "Email is required",
  },
};
