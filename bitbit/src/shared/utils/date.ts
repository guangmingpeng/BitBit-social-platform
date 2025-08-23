import { DEFAULT_DATE_FORMAT } from "../config/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatDate = (
  date: Date | string,
  format = DEFAULT_DATE_FORMAT
): string => {
  return dayjs(date).format(format);
};

export const isValidDate = (date: Date | string): boolean => {
  return dayjs(date).isValid();
};

export const getRelativeTime = (date: Date | string): string => {
  return dayjs(date).fromNow();
};

export const addDays = (date: Date | string, days: number): Date => {
  return dayjs(date).add(days, "day").toDate();
};

export const subtractDays = (date: Date | string, days: number): Date => {
  return dayjs(date).subtract(days, "day").toDate();
};

export const isSameDay = (
  date1: Date | string,
  date2: Date | string
): boolean => {
  return dayjs(date1).isSame(date2, "day");
};

export const isBefore = (
  date1: Date | string,
  date2: Date | string
): boolean => {
  return dayjs(date1).isBefore(date2);
};

export const isAfter = (
  date1: Date | string,
  date2: Date | string
): boolean => {
  return dayjs(date1).isAfter(date2);
};
