const cairoDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Cairo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const cairoHourFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Cairo",
  hour: "2-digit",
  hourCycle: "h23",
});

const utcFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function getWorkingHours(timestamp: number) {
  const parts = cairoDateFormatter.formatToParts(timestamp);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((value) => value.type === type)?.value);
  const date = [part("year"), part("month") - 1, part("day")] as const;
  const noon = Date.UTC(...date, 12);
  const offsetHours = Number(cairoHourFormatter.format(noon)) - 12;
  const start = Date.UTC(...date, 8) - offsetHours * 3_600_000;
  const end = Date.UTC(...date, 23, 59) - offsetHours * 3_600_000;

  return {
    cairo: "08:00 - 23:59",
    zone: offsetHours === 3 ? "EEST" : "EET",
    utc: `${utcFormatter.format(start)} - ${utcFormatter.format(end)}`,
  };
}