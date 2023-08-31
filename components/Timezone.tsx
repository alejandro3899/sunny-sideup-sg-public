"use client";

import { Homepage } from "@/types/cms";
import { useEffect, useState } from "react";

interface TimezoneProps {
  data: /*Homepage["hero"]["timezones"]*/ {
    label: string;
    codeLabel: string;
    timezone: string;
  };
}

export default function Timezone({ data }: TimezoneProps) {
  const { label, codeLabel, timezone } = data;
  const [currentDate, setCurrentDate] = useState<Date>();

  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex gap-3 text-[10px] font-medium leading-none">
      <div className="min-w-[72px]">{label}</div>
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
