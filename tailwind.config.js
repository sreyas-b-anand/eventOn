/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: '#1a202c', // Gray 900 (Background)
        foreground: '#d1d5db', // Gray 300 (Text)
        card: {
          DEFAULT: '#2d3748', // Gray 800 (Card Background)
          foreground: '#ea580c' // Orange 600 (Card Text)
        },
       
        primary: {
          DEFAULT: '#3b82f6', // Blue 500 (Primary Accent)
          foreground: '#f1f5f9' // Gray 100 (Primary Text)
        }
,        
        secondary: {
          DEFAULT: '#2d3748', // Gray 800 (Secondary Accent)
          foreground: '#d1d5db' // Gray 300 (Secondary Text)
        },
        muted: {
          DEFAULT: '#2d3748', // Gray 800 (Muted Background)
          foreground: '#d1d5db' // Gray 300 (Muted Text)
        },
        accent: {
          DEFAULT: '#2d3748', // Gray 800 (Accent Background)
          foreground: '#ea580c' // Orange 600 (Accent Text)
        },
        destructive: {
          DEFAULT: '#f87171', // Red 400 (Destructive Background)
          foreground: '#d1d5db' // Gray 300 (Destructive Text)
        },
        border: '#4b5563', // Gray 600 (Border)
        input: '#1a202c', // Gray 900 (Input Background)
        ring: '#ea580c', // Orange 600 (Ring Accent)
        chart: {
          '1': '#ea580c', // Orange 600
          '2': '#2d3748', // Gray 800
          '3': '#f87171', // Red 400
          '4': '#4b5563', // Gray 600
          '5': '#d1d5db'  // Gray 300
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
