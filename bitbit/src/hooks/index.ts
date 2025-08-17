import { useLayoutEffect, useState } from "react";
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from "../config/constants";

type DeviceType = "mobile" | "tablet" | "desktop";

export const useViewport = () => {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const updateSize = () => {
      const windowWidth = window.innerWidth;
      setWidth(windowWidth);

      if (windowWidth < MOBILE_BREAKPOINT) {
        setDevice("mobile");
      } else if (windowWidth < TABLET_BREAKPOINT) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return { device, width };
};

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useLayoutEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useLayoutEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useState<number>(Date.now())[0];

  useLayoutEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan >= limit) {
        setThrottledValue(value);
      }
    }, limit - (Date.now() - lastRan));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit, lastRan]);

  return throttledValue;
};
