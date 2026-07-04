import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "./Avatar";

const meta = {
  title: "Share/Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Khoa Quang",
    fallback: "KQ",
    size: "md",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const WithImage: Story = {
  args: {
    alt: "User avatar",
    src: "https://i.pravatar.cc/120?img=12",
  },
};
