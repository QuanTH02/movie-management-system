import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Professional Movie Streaming Color Palette
        // Primary Brand Colors - Deep Purple/Violet for premium feel
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Main brand color
          600: '#9333ea', // Primary action
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Accent Colors - Vibrant and modern
        accent: {
          orange: '#ff6b35', // Energetic orange
          blue: '#4a90e2', // Trust blue
          green: '#2ecc71', // Success green
          yellow: '#f1c40f', // Attention yellow
          pink: '#e91e63', // Playful pink
          purple: '#9b59b6', // Creative purple
          cyan: '#1abc9c', // Fresh cyan
        },
        // Dark Theme - Professional cinema aesthetic
        dark: {
          bg: '#0a0a0a', // Deep black background
          surface: '#141414', // Surface elevation
          card: '#1a1a1a', // Card background
          'card-hover': '#252525', // Card hover state
          border: '#2a2a2a', // Border color
          'border-light': '#3a3a3a', // Light border
          text: '#ffffff', // Primary text
          'text-secondary': '#d1d5db', // Secondary text (lighter for better contrast)
          'text-muted': '#a3a3a3', // Muted text (lighter for better contrast)
        },
        // Semantic Colors
        success: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        warning: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24',
        },
        error: {
          DEFAULT: '#ef4444', // Red color for errors
          dark: '#dc2626',
          light: '#f87171',
        },
        info: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          light: '#60a5fa',
        },
        // Link Colors - Use text-link, text-link-hover, text-link-active
        link: {
          DEFAULT: '#a855f7', // Primary purple
          hover: '#9333ea',
          active: '#7e22ce',
        },
        // Rating/Star Colors
        rating: {
          DEFAULT: '#fbbf24', // Gold
          hover: '#f59e0b',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Poppins',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      spacing: {
        container: '85%',
        'navbar-height': '64px',
      },
      borderRadius: {
        card: '12px',
        button: '8px',
        badge: '20px',
        input: '8px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.5)',
        navbar: '0 2px 8px rgba(0, 0, 0, 0.3)',
      },
      transitionDuration: {
        hover: '200ms',
        focus: '150ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
