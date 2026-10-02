module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        kertas: "#E6E6E3",
        permukaan: "#F2F2F0",
        permukaan2: "#D6D6D2",
        garis: "#A9A9A4",
        abu: "#5B5B57",
        aksen: "#1B3DF5"
      },
      fontFamily: {
        display: ["Archivo", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["\"Source Serif 4\"", "Georgia", "serif"]
      },
      keyframes: {
        melayang: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" }
        }
      },
      animation: {
        melayang: "melayang 10s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
