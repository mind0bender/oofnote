import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["GeistVF", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    plugin(function ({
      addVariant,
    }: {
      addVariant: (name: string, css: string) => void;
    }): void {
      addVariant(
        "disabled-within",
        `&:has(input:is(:disabled),button:is(:disabled))`
      );
      // user loggedin variant
      addVariant("alive", '&[data-alive="true"]');
      // secondary form element variant
      addVariant("secondary", '&[data-secondary="true"]');
      addVariant("tertiary", '&[data-tertiary="true"]');
    }),
  ],
};
export default config;
