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
					50: "#F6FAFC",
					100: "#F3EEE6",
					200: "#F3F1EC",
					250: "#f4f2ec",
					300: "#EDEFF3",
					350: "#ECE1D1",
					370: "#DBDFE4",
					380: "#E8E5E1",
					400: "#D4B68A",
					500: "#C79E63",
					600: "#C7A06D",
					DEFAULT: "#C79E63",
				},
				red: {
					50: "#fbdfe6",
					100: "#F2D7DE",
					200: "#FCD5DE",
					300: "#F04A4A",
					400: "#FE1F4C",
					500: "#FF0033",
					600: "#FBF8FA",
					700: "#FCCBD6",
					800: "#fbd2db",
					900: "#fbeff3",
					ERROR: "#FF0033",
					default: "#FF0033",
				},
				green: {
					100: "#F3FCF9",
					200: "#E5F8ED",
					300: "#DFEDE6",
					400: "#62C202",
					500: "#00BA35",
					600: "#C9F0D6",
					700: "#1BC24B",
					800: "#DCF5E6",
					900: "#d3f3de",
					1000: "#0C3330",
					1100: "#c7ead6",
					DEFAULT: "#00BA35",
				},
				blue: {
					50: "#D8EAFA",
					70: "#DCEFFF",
					100: "#0085EE",
					200: "#0085FF",
					300: "#2ab1eb",
					500: "#29ACE5",
					DEFAULT: "#29ACE5",
				},
				gray: {
					40: "#dadde1",
					50: "#F8F9FD",
					100: "#FBF4F7",
					150: "#F4F8FA",
					200: "#EDF3F5",
					250: "#b8bcc1",
					300: "#D5DADE",
					400: "#B5BABB",
					450: "#CED0D4",
					500: "#9EB2C7",
					600: "#656A74",
					700: "#45464B",
					800: "#31424F",
					900: "#2E2F33",
					1000: "#B0B4BA",
					1100: "#E8EDEF",
					1200: "#6C757D",
					1300: "#25262A",
					1350: "#1F1F23",
					1400: "#f5f8fb",
					1500: "#B0B4BA",
					1600: "#b4b6b9",
					1700: "#edf0f3",
					1800: "#e3e6ea",
					1900: "#495660",
					2000: "#72787f",

					DEFAULT: "#2E2F33",
				},
				black: {
					100: "#213240",
					200: "#213240",
					300: "#32424F",
					DEFAULT: "black",
				},
				purple: {
					500: "#675AF9",
					DEFAULT: "#675AF9",
				},
				orange: {
					400: "#de6903",
					500: "#F48218",
					600: "#f7ece0",
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
			transitionProperty: {
				height: "height",
				opacity: "opacity",
				transform: "transform",
			},
			transitionDuration: {
				300: "300ms",
				500: "500ms",
			},
			transitionTimingFunction: {
				"in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
			},
		},
	},
	plugins: [],
};
