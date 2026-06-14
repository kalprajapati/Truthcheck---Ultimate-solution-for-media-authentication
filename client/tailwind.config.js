/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0c', // Very dark near-black
                surface: '#131316',    // Slightly lighter for cards
                'surface-highlight': '#1c1c21',
                primary: {
                    DEFAULT: '#4f46e5', // Indigo 600
                    hover: '#4338ca',   // Indigo 700
                    light: '#818cf8',   // Indigo 400
                },
                accent: {
                    cyan: '#06b6d4',
                },
                status: {
                    success: '#10b981',
                    warning: '#f59e0b',
                    error: '#ef4444',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
