import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Lightweight GA4 wiring for an SPA.
 *
 * No-ops if VITE_GA4_MEASUREMENT_ID is unset — set it in Vercel once the GA4
 * property exists and tracking starts on the next deploy.
 *
 * Defaults `send_page_view: false` and fires page_view manually on every
 * route change so SPA navigation actually gets counted.
 */
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID) return;
    if (window.dataLayer) return;

    window.dataLayer = [];
    // gtag must use `arguments` for GA's expected call signature.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function gtag() { window.dataLayer.push(arguments); };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
