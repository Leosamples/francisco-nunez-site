import { Archivo, Fraunces } from "next/font/google";

// UI: nav, labels, buttons, metadata.
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Editorial serif: headlines, section headings, body copy, pull quotes.
// Variable weight + optical size, upright and italic.
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
