/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'pattern-banner': "url('./assets/profile-pattern-banner-dark.svg')",
      }
    },
  },
  plugins: [],
};
