import React, { useState, useRef, useEffect } from "react";
import Input from "../Input";
import Card from "../Card";
import { cn } from "@/shared/utils/cn";
import dayjs from "dayjs";

interface DateTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value = "",
  onChange,
  onFocus,
  placeholder = "选择日期和时间",
  className,
  disabled = false,
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? dayjs(value).toDate() : undefined
  );
  const [timeValue, setTimeValue] = useState(
    value ? dayjs(value).format("HH:mm") : "09:00"
  );

  // 当外部 value 改变时，更新内部状态
  useEffect(() => {
    if (value) {
      setSelectedDate(dayjs(value).toDate());
      setTimeValue(dayjs(value).format("HH:mm"));
    } else {
      setSelectedDate(undefined);
      setTimeValue("09:00");
    }
  }, [value]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 格式化显示值
  const displayValue = value ? dayjs(value).format("YYYY年MM月DD日 HH:mm") : "";

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // 生成日历数据
  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendar = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + week * 7 + day);

        const isCurrentMonth = currentDate.getMonth() === month;
        const isSelected =
          selectedDate &&
          currentDate.toDateString() === selectedDate.toDateString();
        const isToday = currentDate.toDateString() === today.toDateString();

        // 修复日期比较逻辑，只比较日期部分，不包含时间
        const getCurrentDateOnly = (date: Date) => {
          const dateOnly = new Date(date);
          dateOnly.setHours(0, 0, 0, 0);
          return dateOnly;
        };

        let isDisabled = false;
        const currentDateOnly = getCurrentDateOnly(currentDate);

        if (minDate) {
          const minDateOnly = getCurrentDateOnly(minDate);
          isDisabled = currentDateOnly < minDateOnly;
        }

        if (maxDate && !isDisabled) {
          const maxDateOnly = getCurrentDateOnly(maxDate);
          isDisabled = currentDateOnly > maxDateOnly;
        }

        weekDays.push({
          date: currentDate,
          day: currentDate.getDate(),
          isCurrentMonth,
          isSelected,
          isToday,
          isDisabled,
        });
      }
      calendar.push(weekDays);
    }
    return calendar;
  };

  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const calendar = generateCalendar(currentMonth);
  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  const handleDateSelect = (date: Date) => {
    if (date) {
      setSelectedDate(date);
      // 合并日期和时间
      const dateTime = dayjs(date)
        .hour(parseInt(timeValue.split(":")[0]))
        .minute(parseInt(timeValue.split(":")[1]))
        .format("YYYY-MM-DDTHH:mm");
      onChange(dateTime);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTimeValue(newTime);
    if (selectedDate) {
      const dateTime = dayjs(selectedDate)
        .hour(parseInt(newTime.split(":")[0]))
        .minute(parseInt(newTime.split(":")[1]))
        .format("YYYY-MM-DDTHH:mm");
      onChange(dateTime);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      // 修复月份跳转问题：先设置为月初，再改变月份
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      // 修复月份跳转问题：先设置为月初，再改变月份
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(undefined);
    setTimeValue("09:00");
    onChange("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <Input
        ref={inputRef}
        value={displayValue}
        onClick={handleInputClick}
        onFocus={onFocus}
        placeholder={placeholder}
        className={cn("cursor-pointer", className)}
        readOnly
        disabled={disabled}
      />

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1">
          <Card className="p-4 shadow-lg border bg-white min-w-[320px]">
            {/* 日期选择器 */}
            <div className="mb-4">
              {/* 月份导航 */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h3 className="font-semibold text-gray-900">
                  {currentMonth.getFullYear()}年
                  {monthNames[currentMonth.getMonth()]}
                </h3>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* 星期标题 */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 日期网格 */}
              <div className="space-y-1">
                {calendar.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1">
                    {week.map((dayData, dayIndex) => (
                      <button
                        type="button"
                        key={`${weekIndex}-${dayIndex}`}
                        onClick={() =>
                          !dayData.isDisabled && handleDateSelect(dayData.date)
                        }
                        disabled={dayData.isDisabled}
                        className={cn(
                          "p-2 text-sm rounded-md transition-all duration-200 font-medium",
                          "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500",
                          {
                            "text-gray-400": !dayData.isCurrentMonth,
                            "text-gray-900":
                              dayData.isCurrentMonth &&
                              !dayData.isSelected &&
                              !dayData.isToday,
                            "bg-primary-500 text-white shadow-md":
                              dayData.isSelected,
                            "bg-primary-50 text-primary-600 font-semibold":
                              dayData.isToday && !dayData.isSelected,
                            "text-gray-300 cursor-not-allowed hover:bg-transparent":
                              dayData.isDisabled,
                            "hover:bg-primary-600":
                              dayData.isSelected && !dayData.isDisabled,
                          }
                        )}
                      >
                        {dayData.day}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* 时间选择器 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                时间选择
              </label>
              <input
                type="time"
                value={timeValue}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
              >
                清除
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-1.5 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                disabled={!selectedDate}
              >
                确认
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
