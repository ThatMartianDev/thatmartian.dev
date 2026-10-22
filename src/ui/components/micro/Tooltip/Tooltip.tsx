"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Styles from "./Tooltip.module.css";

type TooltipProps = {
  trigger: ReactNode;
  triggerLabel?: string;
  children: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
  portal?: boolean;
};

export default function Tooltip({ trigger, triggerLabel, children, align = "start", className, portal = false }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useLayoutEffect(() => {
    if (!open || !portal || !root.current || !popup.current) return;

    const anchor = root.current.getBoundingClientRect();
    const panel = popup.current.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const left = align === "end" ? anchor.right - panel.width
      : align === "center" ? anchor.left + (anchor.width - panel.width) / 2
      : anchor.left;
    const top = anchor.bottom + panel.height + 8 <= viewportHeight
      ? anchor.bottom + 8
      : anchor.top - panel.height - 8;

    popup.current.style.left = `${Math.max(8, Math.min(left, viewportWidth - panel.width - 8))}px`;
    popup.current.style.top = `${Math.max(8, top)}px`;

    const dismiss = () => setOpen(false);
    const scroll = (event: Event) => {
      if (event.target instanceof Node && popup.current?.contains(event.target)) return;
      dismiss();
    };
    window.addEventListener("resize", dismiss);
    document.addEventListener("scroll", scroll, true);
    return () => {
      window.removeEventListener("resize", dismiss);
      document.removeEventListener("scroll", scroll, true);
    };
  }, [open, portal, align]);

  useEffect(() => {
    if (!open) return;

    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node) && !popup.current?.contains(event.target as Node)) {
        clearTimeout(timer.current);
        setOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearTimeout(timer.current);
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const panel = (
    <div
      ref={popup}
      id={id}
      role="tooltip"
      hidden={!open}
      className={`${Styles.popup} ${portal ? Styles.portal : Styles[align]}`}
    >
      <div className={Styles.surface}>{children}</div>
    </div>
  );

  return (
    <div
      ref={root}
      className={[Styles.root, className].filter(Boolean).join(" ")}
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setOpen(true), 120);
      }}
      onPointerLeave={() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          if (!root.current?.contains(document.activeElement)) setOpen(false);
        }, 120);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          clearTimeout(timer.current);
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={Styles.trigger}
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-controls={id}
        aria-describedby={open ? id : undefined}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) {
            clearTimeout(timer.current);
            setOpen(true);
          }
        }}
        onClick={() => {
          clearTimeout(timer.current);
          setOpen((value) => !value);
        }}
      >
        {trigger}
      </button>
      {portal ? open && createPortal(panel, document.body) : panel}
    </div>
  );
}