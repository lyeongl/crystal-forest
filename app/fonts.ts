import {
  Cormorant_Garamond,
  Playfair_Display,
  EB_Garamond,
  Caveat,
  Dancing_Script,
  Homemade_Apple,
  Noto_Serif_KR,
  Nanum_Pen_Script,
  Gaegu,
  Gowun_Batang,
  Nanum_Myeongjo,
} from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--cf-font-cormorant",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--cf-font-playfair",
  display: "swap",
});

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--cf-font-ebgaramond",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--cf-font-caveat",
  display: "swap",
});

export const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--cf-font-dancing",
  display: "swap",
});

export const homemade = Homemade_Apple({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--cf-font-homemade",
  display: "swap",
});

export const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--cf-font-noto-serif-kr",
  display: "swap",
});

export const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--cf-font-nanum-pen",
  display: "swap",
});

export const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--cf-font-gaegu",
  display: "swap",
});

export const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--cf-font-gowun",
  display: "swap",
});

export const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--cf-font-nanum-myeongjo",
  display: "swap",
});

export const fontVariableClasses = [
  cormorant.variable,
  playfair.variable,
  ebGaramond.variable,
  caveat.variable,
  dancing.variable,
  homemade.variable,
  notoSerifKr.variable,
  nanumPen.variable,
  gaegu.variable,
  gowunBatang.variable,
  nanumMyeongjo.variable,
].join(" ");
