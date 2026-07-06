import { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronDown,
  HiOutlineCog6Tooth,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/Logo.webp";
import Avatar from "@/share/components/Avatar/Avatar";
import { appConstants } from "@/share/constants/appConstants";
import { cn } from "@/share/utils/cn";

const NAV_ITEMS = [
  { label: "Home", to: appConstants.HOME },
  { label: "Explore", to: "/explore" },
  { label: "Join class", to: "/join-class" },
] as const;

const ACCOUNT_ITEMS = [
  {
    icon: HiOutlineUserCircle,
    label: "Profile",
    to: appConstants.PROFILE,
  },
  {
    icon: HiOutlineCog6Tooth,
    label: "Settings",
    onClick: () => {},
  },
  {
    icon: HiOutlineArrowRightOnRectangle,
    label: "Logout",
    to: appConstants.LOGIN,
  },
] as const;

export default function Header() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 4);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = cn(
    "sticky top-0 z-40 w-full border-b transition-colors duration-200",
    hasScrolled ? "border-border-soft" : "border-transparent",
    "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75",
  );

  const shellClass = cn(
    "mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-10",
  );

  const navClass = cn("hidden items-center gap-10 md:flex");

  const navLinkClass = cn(
    "font-heading text-base font-bold text-text-main transition-colors",
    "hover:text-brand",
  );

  const actionButtonClass = cn(
    "inline-flex h-12 items-center justify-center rounded-2xl bg-brand px-8",
    "font-heading text-base font-bold text-white transition-colors",
    "hover:bg-primary-hover",
  );

  const avatarButtonClass = cn(
    "inline-flex items-center gap-2 rounded-full text-text-main transition",
  );

  const menuClass = cn(
    "absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-2xl border",
    "border-border-soft bg-white p-2 shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
  );

  const menuItemClass = cn(
    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left",
    "font-heading text-sm font-bold text-text-main transition-colors",
    "hover:bg-primary-50 hover:text-brand",
  );

  return (
    <header className={headerClass}>
      <nav className={shellClass} aria-label="Primary navigation">
        <div className="flex items-center gap-10">
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="Engrow"
              className="h-14.5 w-29 object-contain"
            />
          </Link>

          <div className={navClass}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(navLinkClass, isActive && "text-brand")
                }>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="button" className={actionButtonClass}>
            Practice now
          </button>

          <div ref={accountMenuRef} className="relative">
            <button
              type="button"
              className={avatarButtonClass}
              aria-label="Open account menu"
              aria-haspopup="menu"
              aria-expanded={isAccountMenuOpen}
              onClick={() => setIsAccountMenuOpen((current) => !current)}>
              <Avatar name="Khoa Quang" fallback="KQ" />
              <HiOutlineChevronDown
                aria-hidden="true"
                className={cn(
                  "h-5 w-5 text-text-muted transition-transform",
                  isAccountMenuOpen && "rotate-180",
                )}
              />
            </button>

            {isAccountMenuOpen ? (
              <div role="menu" aria-label="Account menu" className={menuClass}>
                {ACCOUNT_ITEMS.map((item) => {
                  const Icon = item.icon;

                  if ("to" in item) {
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        role="menuitem"
                        className={menuItemClass}
                        onClick={() => setIsAccountMenuOpen(false)}>
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 text-brand"
                        />
                        <span>{item.label}</span>
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      type="button"
                      role="menuitem"
                      className={menuItemClass}
                      onClick={() => {
                        item.onClick();
                        setIsAccountMenuOpen(false);
                      }}>
                      <Icon aria-hidden="true" className="h-5 w-5 text-brand" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
}
