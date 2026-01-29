import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "primary-orange": "#f26322",
            },
            animation: {
                scrollVertical: "scrollVertical 20s linear infinite",
                scrollHorizontal: "scrollHorizontal 20s linear infinite",
                slowZoom: "slowZoom 20s infinite alternate",
            },
            keyframes: {
                scrollVertical: {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(-50%)" },
                },
                scrollHorizontal: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                slowZoom: {
                    "from": { transform: "scale(1)" },
                    "to": { transform: "scale(1.1)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
