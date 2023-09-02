/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	important: true,
	theme: {
		fontFamily: {
			inter: ["Inter"],
		},
		extend: {
			colors: {
				primary: {
					200: "#2E2F33",
					300: "#0A0B0F",
					400: "#0E202F",
					500: "#0E2130",
					600: "#0F0F0F",
					700: "#1D1E22",
					DEFAULT: "#0E2130",
				},
				gold: {
					400: "#D4B68A",
					500: "#C79E63",
					600: "#C7A06D",
					DEFAULT: "#C79E63",
				},
				red: {
					200: "#FCD5DE",
					300: "#F04A4A",
					400: "#FE1F4C",
					500: "#FF0033",
					600: "#fbf8fa",
					700: "#fccbd6",
					ERROR: "#f03",
					default: "#FF0033",
				},
				green: {
					100: "#f3fcf9",
					200: "#e5f8ed",
					300: "#dfede6",
					400: "#62C202",
					500: "#00BA35",
					600: "#c9f0d6",
					700: "#1bc24b",
					800: "#dcf5e6",
					DEFAULT: "#00BA35",
				},
				blue: {
					100: "#0085ee",
					500: "#29ACE5",
					DEFAULT: "#29ACE5",
				},
				gray: {
					100: "#FBF4F7",
					200: "#EDF3F5",
					300: "#D5DADE",
					400: "#B5BABB",
					500: "#9EB2C7",
					600: "#656A74",
					700: "#45464B",
					800: "#31424F",
					900: "#2E2F33",
					1000: "#B0B4BA",
					1100: "#e8edef",
					1200: "#6c757d",
					DEFAULT: "#2E2F33",
				},
				black: {
					100: "#213240",
					200: "#213240",
					300: "#32424f",
					DEFAULT: "black",
				},
				purple: {
					500: "#675AF9",
					DEFAULT: "#675AF9",
				},
				orange: {
					500: "#F48218",
					DEFAULT: "#F48218",
				},
				yellow: {
					500: "#FAB400",
					DEFAULT: "#FAB400",
				},
				white: {
					DEFAULT: "white",
				},
			},
		},
	},
	plugins: [],
};
