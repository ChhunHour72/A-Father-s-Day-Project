/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        secondary: '#e67e22',
        accent: '#e74c3c',
        light: '#fdf9f3',
        dark: '#1a252f',
        'warm-light': '#fef5eb',
        'warm-medium': '#f9e4d0',
      },
      backgroundImage: {
        'gradient': 'linear-gradient(135deg, #e67e22, #d35400)',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'custom': '0 10px 30px rgba(0,0,0,0.1)',
        'custom-hover': '0 15px 40px rgba(0,0,0,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse': 'pulse 4s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}