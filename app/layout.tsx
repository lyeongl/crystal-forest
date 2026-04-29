import type { Metadata } from "next";
import "./globals.css";
import { fontVariableClasses } from "./fonts";
import { ScrollPastHero } from "@/components/effects/ScrollPastHero";
import { Petals } from "@/components/effects/Petals";
import { Canopy } from "@/components/effects/Canopy";
import { SceneBackdrop } from "@/components/effects/SceneBackdrop";
import { NavBar } from "@/components/nav/NavBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartToast } from "@/components/cart/CartToast";
import { TweaksPanel } from "@/components/tweaks/TweaksPanel";
import { ProductModal } from "@/components/product/ProductModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://crystal-forest.kr"),
  title: {
    default: "Crystal Forest · 크리스탈 포레스트",
    template: "%s · Crystal Forest",
  },
  description:
    "손으로 꿴 크리스탈 비즈 곰돌이. 꽃의 이름과 숲의 이야기를 담아, 한 점씩 엮어 보냅니다.",
  openGraph: {
    title: "Crystal Forest · 크리스탈 포레스트",
    description:
      "손으로 꿴 크리스탈 비즈 곰돌이. 꽃의 이름과 숲의 이야기를 담아, 한 점씩 엮어 보냅니다.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={fontVariableClasses}>
      <body
        data-palette="cream"
        data-overlay="medium"
        data-cardstyle="rounded"
        data-fontcombo="cormorant-caveat"
        data-headingstyle="editorial"
      >
        <ScrollPastHero />
        <Petals density="medium" />
        <SceneBackdrop />
        <Canopy />
        <NavBar />
        {children}
        <ProductModal />
        <CartDrawer />
        <CartToast />
        <TweaksPanel />
      </body>
    </html>
  );
}
