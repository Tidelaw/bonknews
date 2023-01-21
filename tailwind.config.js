/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'light-orange':"#FFA802",
        "orange":'#FF8002'
      },
    },
    container:{
      center: true,
    }
  },
  plugins: [],
}