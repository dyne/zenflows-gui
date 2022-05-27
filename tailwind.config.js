module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
    daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#02E379",
          "primary-focus":"#02BF67",
          "primary-content":"#0C1729",
          secondary: "#1D3D68",
          "secondary-focus":"#05244F",
          "secondary-content":"#FFFFFF",
          accent: "#00E0FF",
          "accent-focus":"#00C0E2",
          "accent-content":"#05244F",
          neutral: "#475467",
          "neutral-focus":"#344054",
          "neutral-content":"#FFFFFF",
          "base-100": "#F8FAFC",
          "base-200": "#F1F4F8",
          "base-300": "#E3E9F2",
          "base-400": "#C8D4E5",
          "base-content": "#0C1729",
          "info-content": "#0C1729",
          success: "#32D583",
          "success-content": "#092B16",
          warning: "#FDB022",
          "warning-content": "#351507",
          error: "#FF7A70",
          "error-content": "#300502",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/typography'),
      require("daisyui")
  ],
}
