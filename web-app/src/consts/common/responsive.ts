export const BREAKPOINTS = {
  // Extra small screens (e.g., small phones)
  xs: 475,
  // Small screens (e.g., phones)
  sm: 640,
  // Medium screens (e.g., tablets)
  md: 768,
  // Large screens (e.g., laptops)
  lg: 1024,
  // Extra large screens (e.g., desktops)
  xl: 1280,
  // Extra-extra large screens (e.g., large desktops)
  xl2: 1536,
};

export type Breakpoint = keyof typeof BREAKPOINTS;