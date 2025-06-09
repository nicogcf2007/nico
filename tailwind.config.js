// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          'background': '#111827',     // bg-gray-900
          'surface': '#374151',        // bg-gray-700
          'border': '#4B5563',         // border-gray-600
          'text-primary': '#F3F4F6',    // text-gray-100
          'text-secondary': '#D1D5DB', // text-gray-300
          'accent': '#4F46E5',         // bg-indigo-600
          'accent-hover': '#4338CA',   // hover:bg-indigo-700
          'accent-light': '#818CF8',   // text-indigo-400
          'border-accent': '#6366F1',  // NUEVO: hover:border-indigo-500
        }
    },
  },
  plugins: [],
};