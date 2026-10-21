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

export default function Footer({ available = true }: FooterProps) {
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setTimestamp(Date.now()), 1_000);

    return () => window.clearInterval(interval);
  }, []);

  const hours = timestamp === null ? null : getWorkingHours(timestamp);

  return (
    <footer className={Styles.footer}>
      <Tooltip
        className={Styles.location}
        trigger={
          <>
            [ LOC: CAIRO, EG{" "}
            <span className={Styles.coordinates}>
              &lt;30.04&#176;N, 31.23&#176;E&gt;
            </span>{" "}
            ]
          </>
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
        trigger={
          <>
            [ TIME:{" "}
            <time
              dateTime={
                timestamp === null
                  ? undefined
                  : new Date(timestamp).toISOString()
              }
            >
              {timestamp === null ? "--:--" : cairoFormatter.format(timestamp)}
            </time>
            ]
          </>
        }
      >
        <p className={Styles.popupTitle}>Flexible scheduling window</p>
        <p className={Styles.popupDescription}>
          I can arrange my working hours within this range.
        </p>
        <dl className={Styles.details}>
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
        trigger={
          <>
            [ STATUS:{" "}
            <span className={available ? Styles.available : Styles.unavailable}>
              {available ? "AVAILABLE" : "UNAVAILABLE"}
            </span>{" "}
            ]
          </>
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
