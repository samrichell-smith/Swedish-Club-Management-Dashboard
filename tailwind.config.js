/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", 
    ],
    theme: {
      extend: {
        fontFamily: {
          interry: ['Inter24'], // Ensure "Inter" matches the font-family in your CSS
        },
      },
    },
    plugins: [],
  };
  