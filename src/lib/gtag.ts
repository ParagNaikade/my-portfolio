export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Generic event
export const logEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !GA_TRACKING_ID) {
    console.warn("GA not initialized or GA_TRACKING_ID is missing.");
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
