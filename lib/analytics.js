// lib/analytics.js
import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

export function trackEvent(name, params = {}) {
  if (analytics) {
    logEvent(analytics, name, params);
  }
}
