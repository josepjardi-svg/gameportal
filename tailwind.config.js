/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        surface: '#1e293b',
        'surface-2': '#263347',
        accent: '#22c55e',
        'accent-dark': '#16a34a',
        'accent-glow': 'rgba(34,197,94,0.15)',
        muted: '#64748b',
        border: '#334155',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glow: {
          from: { boxShadow: '0 0 5px rgba(34,197,94,0.3)' },
          to: { boxShadow: '0 0 20px rgba(34,197,94,0.7)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse at top, #1e293b 0%, #0f172a 70%)',
      },
    },
  },
  plugins: [],
};
