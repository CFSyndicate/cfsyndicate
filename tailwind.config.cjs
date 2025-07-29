/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'forge-dark': '#111111',        // Main background
                'forge-surface': '#1A1A1A',     // Card/surface background (replaces bg-white/5)
                'forge-line': '#2D2D2D',        // Subtle border color (replaces border-white/10)
                'forge-accent': '#E15D02',       // Primary brand orange
                'forge-text': '#D1D5DB',         // Main text color
                'forge-text-secondary': '#6B7280', // Muted text for descriptions
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            // Subtle animation for decorative elements
            keyframes: {
                'ember-float': {
                    '0%, 100%': { opacity: '0.1', transform: 'translateY(0)' },
                    '50%': { opacity: '0.8', transform: 'translateY(-15px)' },
                },
            },
            animation: {
                'ember-float': 'ember-float 5s ease-in-out infinite',
            },
        },
    },
    plugins: [
        // Official plugin for styling markdown/MDX content
        require('@tailwindcss/typography'),

        // Custom plugin for our "bg-forge" utilities
        plugin(function ({ addUtilities, theme }) {
            addUtilities({
                // A subtle radial gradient for hero sections
                '.bg-forge-gradient': {
                    backgroundColor: theme('colors.forge-dark'),
                    backgroundImage: `radial-gradient(ellipse at top, ${theme('colors.forge-surface')} 0%, ${theme('colors.forge-dark')} 70%)`,
                },
                // The digital grid pattern for backgrounds
                '.bg-forge-grid': {
                    backgroundColor: theme('colors.forge-dark'),
                    backgroundImage: `linear-gradient(${theme('colors.forge-line')} 1px, transparent 1px), linear-gradient(90deg, ${theme('colors.forge-line')} 1px, transparent 1px)`,
                    backgroundSize: '3rem 3rem',
                },
            })
        })
    ],
}