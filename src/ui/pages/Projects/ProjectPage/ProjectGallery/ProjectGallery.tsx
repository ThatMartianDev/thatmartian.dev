"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { ProjectImage } from "@/src/data/projectTypes";
import Button from "@/src/ui/components/micro/Button/Button";
import Styles from "./ProjectGallery.module.css";

type ProjectGalleryProps = {
  projectName: string;
  thumbnail: string;
  images?: readonly ProjectImage[];
};

const thumbnailSizes =
  "(max-width: 48rem) calc(100vw - 6rem), calc(36vw - 6rem)";
const gallerySizes = "calc(100vw - 3rem)";
const duration = 280;

export default function ProjectGallery({
  projectName,
  thumbnail,
  images,
}: ProjectGalleryProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const closingRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [index, setIndex] = useState(0);
  const [thumbnailSize, setThumbnailSize] = useState({ width: 3, height: 2 });
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const slides: readonly ProjectImage[] = images?.length
    ? images
    : [{ src: thumbnail, alt: `${projectName} preview`, ...thumbnailSize }];
  const current = slides[index];
  const imageStyle: CSSProperties & { "--image-ratio": number } = {
    "--image-ratio": current.width / current.height,
  };
  const adjacentIndexes =
    slides.length > 1
      ? [
          ...new Set([
            (index + slides.length - 1) % slides.length,
            (index + 1) % slides.length,
          ]),
        ]
      : [];

  function animateImage(closing: boolean) {
    const frame = frameRef.current;
    const trigger = triggerRef.current;

    if (!frame || !trigger) return null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return null;

    animationRef.current?.cancel();
    const source = trigger.getBoundingClientRect();
    const target = frame.getBoundingClientRect();
    const scale = Math.max(
      source.width / target.width,
      source.height / target.height,
    );
    const offsetX =
      source.left + source.width / 2 - target.left - target.width / 2;
    const offsetY =
      source.top + source.height / 2 - target.top - target.height / 2;
    const cropX = Math.max(0, (target.width - source.width / scale) / 2);
    const cropY = Math.max(0, (target.height - source.height / scale) / 2);
    const animation = frame.animate(
      [
        {
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          clipPath: `inset(${cropY}px ${cropX}px)`,
        },
        { transform: "none", clipPath: "inset(0px)" },
      ],
      {
        duration,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        direction: closing ? "reverse" : "normal",
        fill: "both",
      },
    );
    animationRef.current = animation;
    return animation;
  }

  useLayoutEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!dialog || !trigger) return;

    const scrollContainers: {
      element: HTMLElement;
      overflow: string;
      gutter: string;
    }[] = [];
    for (
      let element = trigger.parentElement;
      element;
      element = element.parentElement
    ) {
      if (/(auto|scroll)/.test(getComputedStyle(element).overflowY)) {
        scrollContainers.push({
          element,
          overflow: element.style.overflow,
          gutter: element.style.scrollbarGutter,
        });
        element.style.scrollbarGutter = "stable";
        element.style.overflow = "hidden";
      }
    }

    dialog.showModal();
    animateImage(false);

    return () => {
      animationRef.current?.cancel();
      if (dialog.open) dialog.close();
      for (const { element, overflow, gutter } of scrollContainers) {
        element.style.overflow = overflow;
        element.style.scrollbarGutter = gutter;
      }
    };
  }, [isOpen]);

  function closeGallery() {
    if (closingRef.current) return;
    closingRef.current = true;
    setIsClosing(true);
    const animation = animateImage(true);
    if (animation) {
      animation.onfinish = () => dialogRef.current?.close();
    } else {
      dialogRef.current?.close();
    }
  }

  function navigate(direction: number) {
    if (closingRef.current || slides.length < 2) return;
    animationRef.current?.cancel();
    setIndex(
      (previous) => (previous + direction + slides.length) % slides.length,
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={Styles.thumbnail}
        aria-label={`Open ${projectName} image gallery`}
        aria-haspopup="dialog"
        data-open={isOpen || undefined}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={thumbnail}
          alt=""
          fill
          sizes={thumbnailSizes}
          className={Styles.thumbnailImage}
          onLoad={(event) => {
            const { naturalWidth: width, naturalHeight: height } =
              event.currentTarget;
            setThumbnailSize({ width, height });
          }}
        />
        <span className={Styles.hint} aria-hidden="true">
          View gallery
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className={Styles.dialog}
        aria-label={`${projectName} image gallery`}
        data-closing={isClosing || undefined}
        data-gallery-backdrop
        onCancel={(event) => {
          event.preventDefault();
          closeGallery();
        }}
        onClose={() => {
          setIsOpen(false);
          setIsClosing(false);
          setIndex(0);
          closingRef.current = false;
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (
            event.target instanceof HTMLElement &&
            event.target.hasAttribute("data-gallery-backdrop")
          )
            closeGallery();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigate(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {isOpen && (
          <div className={Styles.viewer} data-gallery-backdrop>
            <div className={Styles.toolbar} data-gallery-backdrop>
              <Button
                text="Close"
                aria-label="Close gallery"
                onClick={closeGallery}
                className={Styles.action}
              />
            </div>

            <div className={Styles.stage} data-gallery-backdrop>
              <div
                ref={frameRef}
                className={Styles.imageFrame}
                style={imageStyle}
              >
                {index === 0 &&
                  loadedSrc !== current.src &&
                  failedSrc !== current.src && (
                    <Image
                      src={thumbnail}
                      alt=""
                      fill
                      sizes={thumbnailSizes}
                      className={Styles.image}
                      aria-hidden="true"
                    />
                  )}
                {failedSrc !== current.src ? (
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes={gallerySizes}
                    loading="eager"
                    className={Styles.image}
                    onLoad={() => setLoadedSrc(current.src)}
                    onError={() => setFailedSrc(current.src)}
                  />
                ) : (
                  <p className={Styles.feedback} role="alert">
                    This image could not be loaded.
                  </p>
                )}
                {loadedSrc !== current.src && failedSrc !== current.src && (
                  <p className={Styles.feedback} role="status">
                    Loading image...
                  </p>
                )}
                {adjacentIndexes.map((adjacentIndex) => (
                  <Image
                    key={`preload-${slides[adjacentIndex].src}`}
                    src={slides[adjacentIndex].src}
                    alt=""
                    fill
                    sizes={gallerySizes}
                    loading="eager"
                    className={Styles.preload}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            <div className={Styles.controls} data-gallery-backdrop>
              {slides.length > 1 && (
                <Button
                  text="Prev"
                  aria-label="Previous image"
                  onClick={() => navigate(-1)}
                  className={Styles.action}
                />
              )}
              <p className={Styles.counter} role="status" aria-atomic="true">
                <span className={Styles.srOnly}>Image </span>
                {String(index + 1).padStart(2, "0")}
                <span aria-hidden="true"> / </span>
                <span className={Styles.srOnly}> of </span>
                {String(slides.length).padStart(2, "0")}
              </p>
              {slides.length > 1 && (
                <Button
                  text="Next"
                  aria-label="Next image"
                  onClick={() => navigate(1)}
                  className={Styles.action}
                />
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
