# Crystal Forest 🌿

손으로 꿴 크리스탈 비즈 곰돌이 — 꽃의 이름과 숲의 이야기를 담은 키링 컬렉션 사이트.

**Stack**: Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Zustand · MDX + Zod

---

## 시작하기

### 요구 사항

- Node.js **20+**
- npm (또는 pnpm/yarn — `package-lock.json`이 있어 npm이 가장 간단)

### 개발 서버

```bash
npm install        # 처음 한 번만
npm run dev        # http://localhost:3000
```

### 프로덕션 빌드

```bash
npm run build      # .next/ 에 빌드 산출물
npm run start      # 프로덕션 서버 실행
```

### 타입 체크 & 린트

```bash
npx tsc --noEmit   # 타입 체크
npm run lint       # ESLint
```

### Tweaks 패널 (디자인 시연용)

URL에 `?tweaks=1` 을 붙이면 우측 하단에 패널이 떠요. 팔레트(크림/라벤더/포레스트/허니), 카드 스타일, 폰트 조합, Collection 제목 스타일을 즉시 바꿔볼 수 있습니다.

```
http://localhost:3000/?tweaks=1
```

---

## 프로젝트 구조

```
crystal-forest/
├── app/
│   ├── layout.tsx                        # 루트 레이아웃 (폰트, 메타, 효과 레이어, Nav)
│   ├── page.tsx                          # 홈 (Hero + Collection + About + Custom)
│   ├── fonts.ts                          # next/font 11종 + CSS 변수 매핑
│   ├── globals.css                       # 디자인 시스템 전체 (1500+ 라인)
│   ├── sitemap.ts                        # /sitemap.xml 자동 생성
│   ├── robots.ts                         # /robots.txt 자동 생성
│   ├── collection/
│   │   └── page.tsx                      # /collection — 전체 상품 (필터/정렬)
│   ├── products/[slug]/
│   │   └── page.tsx                      # /products/[slug] — 풀 페이지 + JSON-LD
│   └── @modal/                           # 병렬 라우트 슬롯
│       ├── default.tsx
│       └── (.)products/[slug]/
│           └── page.tsx                  # Intercepting Route — 카드 클릭 시 모달
├── components/
│   ├── nav/NavBar.tsx                    # 데스크탑 네비 + 모바일 햄버거
│   ├── hero/Hero.tsx                     # 풀스크린 슬라이드쇼 (crossfade/kenburns/vertical)
│   ├── collection/
│   │   ├── Collection.tsx                # 홈 그리드
│   │   ├── AllCollection.tsx             # /collection 페이지 (필터/정렬)
│   │   ├── ProductCard.tsx
│   │   └── CollectionMore.tsx            # "View all collection" 링크
│   ├── product/
│   │   ├── ProductDetail.tsx             # 모달 + 풀 페이지 공용 본문
│   │   └── ProductModal.tsx              # 모달 래퍼 (Esc, body lock, router.back)
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Custom.tsx
│   │   └── Footer.tsx
│   ├── effects/
│   │   ├── Petals.tsx                    # 꽃잎/잎사귀 (마우스 회피)
│   │   ├── Sparkles.tsx                  # 카드 위 반짝임
│   │   ├── Canopy.tsx                    # 상단 덩쿨 그라데이션
│   │   ├── SceneBackdrop.tsx
│   │   ├── Reveal.tsx                    # IntersectionObserver 스크롤 등장
│   │   └── ScrollPastHero.tsx            # 히어로 지나면 body에 .cf-past-hero
│   ├── cart/
│   │   ├── CartDrawer.tsx                # 슬라이드인 장바구니
│   │   └── CartToast.tsx                 # 담기 토스트
│   └── tweaks/TweaksPanel.tsx            # ?tweaks=1 디자인 패널
├── content/
│   └── products/                         # 상품 콘텐츠 (MDX)
│       ├── 01-lilac/index.mdx
│       ├── 02-hydrangea/index.mdx
│       └── ... (총 9개)
├── lib/
│   ├── content/
│   │   ├── schema.ts                     # Zod ProductFrontmatter
│   │   └── products.ts                   # MDX 로더 (getProducts/getProduct/getProductSlugs)
│   ├── cart/store.ts                     # Zustand + localStorage persist
│   └── utils/cn.ts                       # clsx wrapper
└── public/
    ├── assets/
    │   ├── bears/                        # 히어로 슬라이드 이미지 4장
    │   ├── petals/                       # 꽃잎/잎사귀 SVG 6종
    │   ├── blossom/                      # 캐노피 PNG 2종
    │   └── paper-noise.svg               # 배경 종이 질감
    └── products/
        └── 01-lilac/cover.jpg            # 상품별 메인 이미지
        └── ...
```

---

## 라우트 맵

| URL | 설명 |
|---|---|
| `/` | 홈 — Hero, Collection 9개, About, Custom |
| `/collection` | 전체 컬렉션 — 필터(All/New/Best) + 정렬(Curated/A→Z/Price ↑↓) |
| `/products/[slug]` | 상품 상세 — 풀 페이지 (직접 URL · 새로고침 · 공유용) |
| `/products/[slug]` | 같은 URL이지만 홈에서 카드 클릭 시 **모달**로 표시 (Intercepting Route) |
| `/?tweaks=1` | Tweaks 패널 활성화 |
| `/sitemap.xml` | 자동 생성 |
| `/robots.txt` | 자동 생성 |

---

## 상품 추가하기

### 1단계: 콘텐츠 파일 생성

`content/products/{번호}-{slug}/index.mdx` 를 만듭니다.

```
content/products/10-jasmine/
└── index.mdx
```

기존 상품(예: `01-lilac/index.mdx`)을 복사해서 수정하면 빠릅니다.

```mdx
---
id: jasmine
order: 10
name: 자스민
en: Jasmine
price: 50000
tag: new
color: "#f5f0e8"
crop: "center 40%"
poem: 여름 밤의 흰 향기
cover: ./cover.jpg
specs:
  소재: 크리스탈 비즈 · 폴리코드
  크기: 약 5.5 × 4.5 cm
  제작: 100% 수작업 · 7일 소요
publishedAt: 2026-05-01
---

본문은 자유롭게 — 모달 본문에 표시됩니다.
```

### 2단계: 메인 이미지 배치

`public/products/10-jasmine/cover.jpg` 위치에 이미지를 넣습니다.

이미지는 **1200px 폭, 85% quality** 로 리사이징 권장합니다. 원본(4032x3024)은 3~4MB이지만, 리사이징하면 300~400KB로 줄어 로딩이 훨씬 빠릅니다.

### 3단계: 확인

`npm run dev` — 자동 반영. frontmatter 누락이나 오타가 있으면 빌드 시 Zod 에러가 어떤 필드가 문제인지 알려줍니다.

### Frontmatter 필드 스펙

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `id` | string | O | URL slug로 사용 (`/products/{id}`) |
| `order` | int | O | 정렬 순서 (낮을수록 앞) |
| `name` | string | O | 한글 이름 |
| `en` | string | O | 영문 이름 |
| `price` | int | O | 가격 (원, 0 이상) |
| `tag` | `"new"` \| `"best"` \| `null` | - | 필터 태그 (기본 `null`) |
| `color` | string | O | 카드 배경색 (hex, 예: `"#f5f0e8"`) |
| `crop` | string | O | CSS `object-position` (예: `"center 40%"`) |
| `poem` | string | O | 한 줄 설명 (카드에 표시) |
| `cover` | string | O | 커버 이미지 경로 (항상 `./cover.jpg`) |
| `specs` | Record | O | 스펙 key-value 맵 (자유 구성, 예: 소재/크기/제작) |
| `publishedAt` | date | O | 게시일 (`YYYY-MM-DD`) |

> `specs`는 자유로운 key-value 맵입니다. 항목을 추가하거나 빼도 UI가 자동으로 맞춰집니다.

### 이미지 관리

| 경로 | 용도 |
|---|---|
| `public/products/{번호}-{slug}/cover.jpg` | 서빙용 이미지 (리사이징됨) |
| `public/products/_originals/{번호}-{slug}.jpg` | 원본 백업 |

> **Sanity 마이그레이션 시**: frontmatter 필드명이 그대로 GROQ 쿼리 필드와 1:1 매칭되도록 설계되어 있어요. `lib/content/products.ts` 의 `loadAll()` 만 Sanity 클라이언트 호출로 바꾸면 됩니다.

---

## 디자인 토큰 변경

`app/globals.css` 상단의 `:root` 안에서 4가지 팔레트 변수를 모두 관리합니다:

- `--cf-bg`, `--cf-paper`, `--cf-ink`, `--cf-sage-deep`, ... (Cream — 기본값)
- `--p2-*` (Lavender Dream)
- `--p3-*` (Forest Deep)
- `--p4-*` (Sunset Honey)

`<body data-palette="forest">` 처럼 속성을 바꾸면 전체 팔레트가 swap 됩니다. 다른 데이터 속성:

| 속성 | 값 |
|---|---|
| `data-palette` | `cream` · `lavender` · `forest` · `honey` |
| `data-overlay` | `heavy` · `medium` · `light` · `none` (덩쿨 강도) |
| `data-cardstyle` | `rounded` · `angular` · `polaroid` |
| `data-fontcombo` | `cormorant-caveat` · `playfair-dancing` · `ebgaramond-homemade` |
| `data-headingstyle` | `classic` · `editorial` · `myeongjo` · `bilingual` |

기본값은 `app/layout.tsx` 의 `<body>` 에 하드코드 — 서비스 운영 중 일괄 변경이 필요하면 거기를 수정하세요.

---

## 카트 / 주문

- 카트 상태는 [`lib/cart/store.ts`](lib/cart/store.ts) Zustand 스토어, `localStorage` 에 자동 동기화
- 결제는 현재 **인스타그램 DM** 으로 안내. 모든 외부 링크는 `https://instagram.com/crystal.forest.kr` 로 통일되어 있어요. 핸들이 바뀌면 다음 파일들에서 일괄 수정:
  - `components/nav/NavBar.tsx`
  - `components/sections/Footer.tsx`
  - `components/sections/Custom.tsx`
  - `components/cart/CartDrawer.tsx`
  - `components/product/ProductDetail.tsx`

향후 Stripe 등 실결제로 이동할 때는 카트 스토어의 `add/remove/setQty` API 는 유지하고 결제 호출만 추가하면 됩니다.

---

## SEO

- **메타데이터**: 모든 페이지에 `generateMetadata` 적용. 상품 페이지는 OG 이미지 자동 설정.
- **JSON-LD**: 상품 페이지에 `Product` 스키마 (가격, 통화 KRW, 재고 상태 포함).
- **Sitemap**: 빌드 시 `/sitemap.xml` 자동 생성 — 9개 상품 + 홈 + collection.
- **robots.txt**: 모든 크롤러 허용.

`metadataBase` URL은 [`app/layout.tsx`](app/layout.tsx) 에 `https://crystal-forest.kr` 로 하드코딩되어 있어요. 실제 도메인으로 배포할 때 거기와 [`app/sitemap.ts`](app/sitemap.ts) 의 `BASE` 상수를 함께 갱신.

---

## 배포

Vercel 가장 간단:

```bash
npx vercel        # 첫 배포 시 프로젝트 연결
npx vercel --prod # 프로덕션 배포
```

빌드 결과:
- 정적 페이지: `/`, `/collection`, `/products/lilac` 등 9개 상품 페이지 모두 SSG
- 동적 페이지: 인터셉팅 모달 (`/(.)products/[slug]`) 만 SSR
- 첫 로드 JS: 약 113 kB

---

## 라이선스

Private — © 2026 Crystal Forest
