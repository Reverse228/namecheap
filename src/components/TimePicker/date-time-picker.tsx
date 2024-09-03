"use client";

import * as React from "react";
import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";
import { FC, useEffect, useState } from "react";

type Props = {
  getDate: (date: Date) => void;
};

const DateTimePicker: FC<Props> = ({ getDate }) => {
  const [date, setDate] = useState<Date>();

  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };

  useEffect(() => {
    if (date) {
      getDate(date);
    }
  }, [date]);

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "P HH:mm:ss")
          ) : (
            <span>Удобное время для звонка</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[278px] p-0 flex flex-col -left-36 "
        popover={"auto"}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;
