"use client";

import Styles from "./Button.module.css";
import Link from "next/link";
import { useState, type ComponentProps, type ReactNode } from "react";
import NavLabel from "./NavLabel";

type VariationProps =
  | { variation: "nav"; index: string; active?: boolean; hoverText?: string; glyphs?: string }
  | { variation?: "default"; index?: never; active?: never; hoverText?: never; glyphs?: never };

type ContentProps = {
  icon?: ReactNode;
  text: string;
};

export type ButtonProps = ContentProps &
  VariationProps &
  (
    | ({
        htmlType: "link";
        url: string;
      } & Omit<ComponentProps<typeof Link>, "href" | "children">)
    | ({
        htmlType?: "button" | "submit" | "reset";
      } & Omit<ComponentProps<"button">, "type" | "children">)
  );

const Button = (props: ButtonProps) => {
  const {
    variation = "default",
    index,
    active = false,
    icon,
    text,
    className,
    hoverText,
    glyphs = "⎔⟁⧖⌖⌬◰◱⏣",
    ...elementProps
  } = props;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const engaged = hovered || focused;
  const classes = [
    Styles.button,
    Styles[variation],
    active && Styles.active,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={Styles.bracket} aria-hidden="true">[</span>
      {variation === "nav" && (
        <span className={Styles.status} aria-hidden="true">
          <span className={Styles.index}>
            {index}{!active && "."}
          </span>
          <span className={Styles.marker}>{active ? ">" : "_"}</span>
        </span>
      )}
      {icon && <span className={Styles.icon} aria-hidden="true">{icon}</span>}
      {variation === "nav" && hoverText ? (
        <NavLabel
          text={text}
          hoverText={hoverText}
          glyphs={glyphs}
          active={engaged}
        />
      ) : <span>{text}</span>}
      <span className={Styles.bracket} aria-hidden="true">]</span>
    </>
  );

  if ("url" in elementProps) {
    const { htmlType, url, ...linkProps } = elementProps;

    return (
      <Link
        {...linkProps}
        href={url}
        className={classes}
        aria-label={linkProps["aria-label"] ?? (variation === "nav" && hoverText ? `${index} ${text} (${hoverText})` : undefined)}
        onPointerEnter={(event) => {
          linkProps.onPointerEnter?.(event);
          if (event.pointerType !== "touch") setHovered(true);
        }}
        onPointerLeave={(event) => {
          linkProps.onPointerLeave?.(event);
          setHovered(false);
        }}
        onFocus={(event) => {
          linkProps.onFocus?.(event);
          setFocused(event.currentTarget.matches(":focus-visible"));
        }}
        onBlur={(event) => {
          linkProps.onBlur?.(event);
          setFocused(false);
        }}
        aria-current={htmlType === "link" && active ? "page" : linkProps["aria-current"]}
      >
        {content}
      </Link>
    );
  } else {
    const { htmlType = "button", ...buttonProps } = elementProps;

    return (
      <button
        {...buttonProps}
        type={htmlType}
        className={classes}
        aria-label={buttonProps["aria-label"] ?? (variation === "nav" && hoverText ? text : undefined)}
        onPointerEnter={(event) => {
          buttonProps.onPointerEnter?.(event);
          if (!event.currentTarget.disabled && event.pointerType !== "touch") setHovered(true);
        }}
        onPointerLeave={(event) => {
          buttonProps.onPointerLeave?.(event);
          setHovered(false);
        }}
        onFocus={(event) => {
          buttonProps.onFocus?.(event);
          setFocused(event.currentTarget.matches(":focus-visible"));
        }}
        onBlur={(event) => {
          buttonProps.onBlur?.(event);
          setFocused(false);
        }}
        aria-pressed={variation === "nav" ? active : buttonProps["aria-pressed"]}
      >
        {content}
      </button>
    );
  }
};

export default Button;
