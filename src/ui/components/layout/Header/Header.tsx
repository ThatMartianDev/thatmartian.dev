"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Button from "@/src/ui/components/micro/Button/Button";
import Styles from "./Header.module.css";

export type HeaderNavItem = {
  href: string;
  label: string;
  index: string;
  hoverText?: string;
  glyphs?: string;
};

type HeaderProps = {
  items?: readonly HeaderNavItem[];
};

const defaultItems: readonly HeaderNavItem[] = [
  { href: "/", label: "Operator", index: "01", hoverText: "About", glyphs: "⍑⌸⌭⌺⌘⌼⌷⌺" },
  { href: "/projects", label: "Deployed Systems", index: "02", hoverText: "Projects", glyphs: "⍆⍇⍒⍎⍑⍛⍇⍆ ⍕⍛⍕⍖⍇⍏⍕" },
  { href: "/architecture", label: "Architecture", index: "03", hoverText: "Tech Stack", glyphs: "⍃⍔⍅⍊⍋⍖⍇⍅⍖⍗⍔⍇" },
  { href: "/contact", label: "Uplink", index: "04", hoverText: "Contact", glyphs: "⌽⌸⌴⌱⌶⌳" },
];

export default function Header({ items = defaultItems }: HeaderProps) {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const menuOpen = openPathname === pathname;
  const menuId = useId();
  const menuRoot = useRef<HTMLDivElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRoot.current?.contains(event.target)) {
        setOpenPathname(null);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenPathname(null);
        menuTrigger.current?.focus();
      }
    };
    const mobile = window.matchMedia("(max-width: 64rem)");
    const resize = () => {
      if (!mobile.matches) {
        if (menuRoot.current?.contains(document.activeElement)) {
          brandRef.current?.focus();
        }
        setOpenPathname(null);
      }
    };

    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    mobile.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      mobile.removeEventListener("change", resize);
    };
  }, [menuOpen]);

  function navigationLinks(mobile = false) {
    return items.map(({ href, label, index, hoverText, glyphs }) => (
      <li key={href}>
        <Button
          htmlType="link"
          variation="nav"
          url={href}
          text={label}
          index={index}
          hoverText={hoverText}
          glyphs={glyphs}
          active={
            pathname === href ||
            (href !== "/" && pathname.startsWith(`${href}/`))
          }
          onClick={mobile ? () => {
            setOpenPathname(null);
            menuTrigger.current?.focus();
          } : undefined}
          className={Styles.navLink}
        />
      </li>
    ));
  }

  return (
    <header className={Styles.header}>
      <Link
        ref={brandRef}
        href="/"
        className={Styles.brand}
        aria-label="ThatMartian.dev home"
        onClick={() => setOpenPathname(null)}
      >
        <span className={Styles.brandMark} aria-hidden="true">&#x232C;</span>
        <span>THATMARTIAN.DEV</span>
      </Link>

      <nav className={Styles.navigation} aria-label="Main navigation">
        <ul className={Styles.links}>
          {navigationLinks()}
        </ul>
      </nav>

      <div
        ref={menuRoot}
        className={Styles.mobileMenu}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpenPathname(null);
          }
        }}
      >
        <Button
          ref={menuTrigger}
          text="Menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setOpenPathname(menuOpen ? null : pathname)}
          className={Styles.menuTrigger}
        />
        <nav
          id={menuId}
          aria-label="Main navigation"
          hidden={!menuOpen}
          className={Styles.menuPanel}
        >
          <ul className={Styles.menuLinks}>{navigationLinks(true)}</ul>
        </nav>
      </div>
    </header>
  );
}