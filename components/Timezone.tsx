"use client";

import { Homepage } from "@/types/cms";
import { useEffect, useState } from "react";

interface TimezoneProps {
  data: NonNullable<Homepage["hero"]["timezones"]>[0];
}

export default function Timezone({ data }: TimezoneProps) {
  const { label, codeLabel, timezone } = data;
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex gap-4 text-[10px] font-medium leading-none">
      <div className="min-w-[30px]">{label}</div>
      <div className="min-w-[44px]">
        {currentDate &&
          currentDate.toLocaleTimeString("en-GB", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
      </div>
      <div>{codeLabel}</div>
    </div>
  );
}
