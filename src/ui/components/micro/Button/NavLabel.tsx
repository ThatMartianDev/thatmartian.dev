"use client";

import { useEffect, useRef, useState } from "react";
import Styles from "./Button.module.css";

type NavLabelProps = {
  text: string;
  hoverText: string;
  glyphs: string;
  active: boolean;
};

export default function NavLabel({ text, hoverText, glyphs, active }: NavLabelProps) {
  const [step, setStep] = useState(0);
  const position = useRef(0);
  const resting = Array.from(text);
  const target = Array.from(hoverText);
  const symbols = Array.from(glyphs);

  useEffect(() => {
    const length = Array.from(text).length + Array.from(hoverText).length;
    const destination = active ? length : 0;
    if (position.current === destination) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const interval = window.setInterval(() => {
      position.current = reducedMotion.matches
        ? destination
        : Math.max(0, Math.min(length, position.current + (active ? 1 : -1)));
      setStep(position.current);
      if (position.current === destination) window.clearInterval(interval);
    }, reducedMotion.matches ? 0 : 400 / length);

    return () => window.clearInterval(interval);
  }, [active, text, hoverText]);

  const resolved = step < resting.length
    ? resting.length - step
    : step - resting.length;
  const letters = step < resting.length ? resting : target;
  const label = step === 0
    ? text
    : step >= resting.length + target.length
      ? hoverText
      : letters.slice(0, resolved).join("") + symbols.slice(resolved).join("");

  return (
    <span
      className={Styles.label}
      style={{ inlineSize: `${Math.max(resting.length, target.length, symbols.length)}ch` }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}