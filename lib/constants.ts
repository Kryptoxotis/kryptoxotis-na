/**
 * Application-wide constants
 * Centralizes magic numbers and configuration values
 */

// API Configuration
export const API_CONFIG = {
  // Timeout for Notion API requests (ms)
  NOTION_TIMEOUT: 15000,
  // Timeout for page content fetch (ms)
  PAGE_CONTENT_TIMEOUT: 10000,
  // Retry count for failed requests
  MAX_RETRIES: 2,
  // Delay between retries (ms)
  RETRY_DELAY: 1000,
  // Batch size for processing blog posts
  BLOG_BATCH_SIZE: 3,
  // Delay between batches (ms)
  BATCH_DELAY: 500,
} as const

// Cache Configuration
export const CACHE_CONFIG = {
  // Revalidation time for static data (seconds)
  STATIC_REVALIDATE: 300, // 5 minutes
  // Revalidation time for dynamic data (seconds)
  DYNAMIC_REVALIDATE: 60, // 1 minute
} as const

// Validation Limits
export const VALIDATION_LIMITS = {
  // Contact form
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254, // RFC 5321
  SUBJECT_MAX_LENGTH: 200,
  MESSAGE_MAX_LENGTH: 5000,
} as const

// HTML Sanitization Configuration
// Note: Not using `as const` here because sanitize-html expects mutable arrays
export const SANITIZE_CONFIG = {
  allowedTags: [
    "p", "h1", "h2", "h3", "strong", "em", "del", "u", "code",
    "a", "li", "ul", "ol", "blockquote", "pre", "hr",
    "figure", "img", "figcaption"
  ],
  allowedSchemes: ["http", "https", "mailto"],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt"],
    code: ["class"],
    pre: ["class"],
  },
}

// HTTP Headers
export const NO_CACHE_HEADERS = {
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
} as const

// Default values
export const DEFAULTS = {
  READ_TIME: 5, // minutes
  AUTHOR: "Kryptoxotis Team",
  PLACEHOLDER_IMAGE: "/placeholder.svg?height=400&width=600",
} as const
