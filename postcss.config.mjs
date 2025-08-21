const config = {
  plugins: ["@tailwindcss/postcss"],
  tailwindcss: {
    config: {
      // Your Tailwind CSS configuration options
      theme: {
        extend: {
          colors: {
            // Custom colors
            background: "#0D0D0D",
            primary: "#6C63FF",
            secondary: "#00E5FF",
            text: "#FFFFFF",
            border: "#A1A1AA"

          },
        },
      },
    },
  },
};

export default config;
