/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // Enable dark mode using a class (e.g., 'dark' on the <html> element)
    theme: {
      extend: {
        colors: {
          primary: {
            300: '#93C5FD', // Lighter blue
            400: '#60A5FA',
            500: '#4F46E5', // Indigo
            600: '#4338CA',
            700: '#3730A3',
          },
          secondary: {
            300: '#C4B5FD',
            400: '#A78BFA',
            500: '#8B5CF6', // Purple
            600: '#7C3AED',
            700: '#6D28D9',
          },
        },
      },
    },
    plugins: [],
  };