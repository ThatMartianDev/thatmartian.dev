"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Styles from "./Tooltip.module.css";

type TooltipProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
};

export default function Tooltip({ trigger, children, align = "start", className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;

    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
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
      <div id={id} role="tooltip" hidden={!open} className={`${Styles.popup} ${Styles[align]}`}>
        <div className={Styles.surface}>{children}</div>
      </div>
    </div>
  );
}