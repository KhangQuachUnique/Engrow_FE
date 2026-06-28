import type { IconType } from "react-icons";
import { cn } from "@/share/utils/cn";

interface AuthTrustItemProps {
  icon: IconType;
  label: string;
}

export default function AuthTrustItem({ icon: Icon, label }: AuthTrustItemProps) {
  const itemClass = cn(
    "inline-flex items-center gap-2",
    "font-sans text-xs font-medium uppercase leading-4 tracking-[0.6px]",
    "text-text-main/60",
  );

  const iconClass = cn("h-5 w-5 text-text-main/60");

  return (
    <span className={itemClass}>
      <Icon aria-hidden="true" className={iconClass} />
      {label}
    </span>
  );
}
