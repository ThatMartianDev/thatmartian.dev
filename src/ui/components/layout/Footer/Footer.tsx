"use client";

import { useEffect, useState } from "react";
import Tooltip from "@/src/ui/components/micro/Tooltip/Tooltip";
import { getWorkingHours } from "@/src/helpers/workingHours";
import Styles from "./Footer.module.css";

type FooterProps = {
  available?: boolean;
};

const cairoFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Cairo",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZoneName: "short",
});

const shortCairoFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Cairo",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export default function Footer({ available = true }: FooterProps) {
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setTimestamp(Date.now()), 1_000);

    return () => window.clearInterval(interval);
  }, []);

  const hours = timestamp === null ? null : getWorkingHours(timestamp);
  const cairoTime = timestamp === null ? "--:--" : shortCairoFormatter.format(timestamp);
  const timezone = timestamp === null
    ? ""
    : cairoFormatter.formatToParts(timestamp).find((part) => part.type === "timeZoneName")?.value;

  return (
    <footer className={Styles.footer}>
      <Tooltip
        className={Styles.location}
        triggerLabel="Location: Cairo, Egypt. Working worldwide."
        trigger={
          <span>
            [ LOC<span className={Styles.value}>: CAIRO<span className={Styles.country}>, EG</span>
              <span className={Styles.coordinates}> &lt;30.04&#176;N, 31.23&#176;E&gt;</span>
            </span> ]
          </span>
        }
      >
        <p className={Styles.popupTitle}>Based in Cairo. Working globally.</p>
        <dl className={Styles.details}>
          <div>
            <dt>Remote</dt>
            <dd>Worldwide</dd>
          </div>
          <div>
            <dt>Hybrid / on-site</dt>
            <dd>Cairo, Egypt</dd>
          </div>
        </dl>
      </Tooltip>

      <Tooltip
        className={Styles.clock}
        align="center"
        triggerLabel={`Cairo time: ${timestamp === null ? "loading" : cairoFormatter.format(timestamp)}. View working hours.`}
        trigger={
          <span>
            [ TIME<span className={Styles.value}>:{" "}
            <time
              dateTime={
                timestamp === null
                  ? undefined
                  : new Date(timestamp).toISOString()
              }
            >
              {cairoTime}<span className={Styles.timezone}>{timezone ? ` ${timezone}` : ""}</span>
            </time>
            </span> ]
          </span>
        }
      >
        <p className={Styles.popupTitle}>Flexible scheduling window</p>
        <p className={Styles.popupDescription}>
          I can arrange my working hours within this range.
        </p>
        <dl className={Styles.details}>
          <div>
            <dt>Current time in Cairo</dt>
            <dd>
              <time dateTime={timestamp === null ? undefined : new Date(timestamp).toISOString()}>
                {timestamp === null ? "--:--" : cairoFormatter.format(timestamp)}
              </time>
            </dd>
          </div>
          <div>
            <dt>Cairo{hours ? ` (${hours.zone})` : ""}</dt>
            <dd>08:00 - 23:59</dd>
          </div>
          <div>
            <dt>UTC / GMT</dt>
            <dd>{hours?.utc ?? "--:-- - --:--"}</dd>
          </div>
        </dl>
      </Tooltip>

      <Tooltip
        className={Styles.status}
        align="end"
        triggerLabel={available ? "Status: available for new opportunities." : "Status: not currently available."}
        trigger={
          <span>
            [ STATUS<span className={Styles.value}>:{" "}
              <span className={available ? Styles.available : Styles.unavailable}>
                {available ? "AVAILABLE" : "UNAVAILABLE"}
              </span>
            </span> ]
          </span>
        }
      >
        <p className={Styles.popupTitle}>
          {available
            ? "Available for new opportunities"
            : "Not currently available"}
        </p>
        <p className={Styles.popupDescription}>
          {available
            ? "Open to jobs and projects."
            : "Not taking on new jobs or projects at the moment."}
        </p>
        {available && (
          <dl className={Styles.details}>
            <div>
              <dt>Start date</dt>
              <dd>Immediately</dd>
            </div>
          </dl>
        )}
      </Tooltip>
    </footer>
  );
}
