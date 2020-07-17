const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID

/**
 * Add the `gtag` function to the window interface.
 *
 * Keeping the interface inside of the `gtag` module means that usage of `gtag`
 * outside of this module (or without importing it) should still throw type errors,
 * which helps keep google analytics from bleeding into the rest of the codebase.
 */
declare global {
  type GTagFunction = (eventName: string, ...args: any[]) => void

  interface Window {
    gtag: GTagFunction
  }
}

/**
 * Tracks a pageview hit.
 *
 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
export const pageview = (url: string): void => {
  window.gtag('config', trackingId, {
    page_path: url
  })
}

/**
 * Tracks a custom event.
 *
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
