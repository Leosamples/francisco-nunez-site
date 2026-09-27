import { Archivo, Fraunces } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Reserved for pull-quote moments only.
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
});
