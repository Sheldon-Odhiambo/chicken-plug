// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // main HTML file
    "./src/**/*.{ts,tsx,js,jsx}" // all React + TS/JS files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
