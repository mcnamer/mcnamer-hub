/**
 * FONT OPTIMIZATION — two families, self-hosted and subset by next/font.
 *
 * The Hand (Inter): all body, nav, labels, buttons, forms, captions.
 * The Voice (Source Serif 4): headlines, heroic numerals, pull quotes.
 *   The open-license route from the blueprint's specimen round — strong numeral
 *   design and a true italic, in the register of Tiempos/Freight.
 *
 * Both are variable fonts with `display: swap` and preload, so first paint is
 * fast and no flash of invisible text occurs. The CSS variables here are read
 * by the --font-hand / --font-voice tokens in globals.css.
 */

import { Inter, Source_Serif_4 } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  preload: true,
});

export const fontVariables = `${inter.variable} ${sourceSerif.variable}`;
