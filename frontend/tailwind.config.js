import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        schoolbooks: {
          primary: "#2563eb", // Blue for education
          secondary: "#10b981", // Green for growth
          accent: "#f59e0b", // Amber for highlights
          neutral: "#374151", // Gray for text
          "base-100": "#ffffff", // White background
          "base-200": "#f3f4f6", // Light gray
          "base-300": "#e5e7eb", // Lighter gray
          info: "#3b82f6", // Blue
          success: "#10b981", // Green
          warning: "#f59e0b", // Amber
          error: "#ef4444", // Red
        },
      },
    ],
  },
};
