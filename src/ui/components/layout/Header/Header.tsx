"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className={Styles.header}>
      <Link
        href="/"
        className={Styles.brand}
        aria-label="ThatMartian.dev home"
      >
        <span className={Styles.brandMark} aria-hidden="true">&#x232C;</span>
        <span>THATMARTIAN.DEV</span>
      </Link>

      <nav className={Styles.navigation} aria-label="Main navigation">
        <ul className={Styles.links}>
          {items.map(({ href, label, index, hoverText, glyphs }) => (
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
                className={Styles.navLink}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}