import { useMemo, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/share/utils/cn";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "children"
> {
  alt?: string;
  fallback?: string;
  name?: string;
  size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

function getInitials(name?: string, fallback?: string) {
  if (fallback) return fallback.slice(0, 2).toUpperCase();
  if (!name) return "?";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function Avatar({
  alt,
  className,
  fallback,
  name,
  size = "md",
  src,
  onError,
  ...imageProps
}: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const initials = useMemo(() => getInitials(name, fallback), [fallback, name]);
  const canShowImage = Boolean(src) && !hasImageError;

  const avatarClass = cn(
    "flex shrink-0 items-center justify-center overflow-hidden rounded-full",
    "bg-primary-300",
    "font-heading font-bold text-white",
    sizeClasses[size],
    className,
  );

  if (canShowImage) {
    return (
      <img
        {...imageProps}
        src={src}
        alt={alt ?? name ?? "User avatar"}
        className={cn(avatarClass, "object-cover")}
        onError={(event) => {
          setHasImageError(true);
          onError?.(event);
        }}
      />
    );
  }

  return (
    <span className={avatarClass} aria-label={alt ?? name ?? "User avatar"}>
      {initials}
    </span>
  );
}
