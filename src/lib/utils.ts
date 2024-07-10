import { clsx, type ClassValue } from "clsx";
import { FormatDistanceFnOptions, FormatDistanceToken, formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-GB";
import { MMKV } from "react-native-mmkv";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAvatarName = (name: string) => {
  if (!name) return "";
  const words = name?.split(" ");
  if (words.length > 2) {
    words.length = 2;
  }
  return words?.map((word) => word[0]).join("");
};

export function formatDistance(
  token: FormatDistanceToken,
  count: number,
  options: FormatDistanceFnOptions = {}
) {
  const formatDistanceLocale = {
    lessThanXSeconds: "{{count}} sec",
    xSeconds: "{{count}} sec",
    halfAMinute: "30 sec",
    lessThanXMinutes: "{{count}} mon",
    xMinutes: "{{count}} mins",
    aboutXHours: "{{count}} hr",
    xHours: "{{count}} hr",
    xDays: "{{count}} d",
    aboutXWeeks: "{{count}} wk",
    xWeeks: "{{count}} wk",
    aboutXMonths: "{{count}} mth",
    xMonths: "{{count}} mth",
    aboutXYears: "{{count}} yr",
    xYears: "{{count}} yr",
    overXYears: "{{count}} yr",
    almostXYears: "{{count}} yr",
  };
  const result = formatDistanceLocale[token].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
}

export function formattedDate(date: Date, addSuffix = false) {
  return formatDistanceToNowStrict(date, {
    addSuffix,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export const mmkvStorage = new MMKV();
