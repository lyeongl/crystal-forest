import Image from "next/image";

export function About() {
  return (
    <section className="cf-about" id="about" data-screen-label="About">
      <div className="cf-about-inner">
        <div className="reveal">
          <div style={{ position: "relative" }}>
            <div className="cf-about-photo">
              <Image
                src="/assets/bears/bear-04.jpg"
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="cf-about-stamp">
              made with
              <br />
              love &amp; beads
            </div>
          </div>
        </div>
        <div className="reveal">
          <span className="lead">our story</span>
          <h2 style={{ marginTop: 14 }}>
            <em>
              한 알의 비즈로
              <br />
              숲을 엮다
            </em>
          </h2>
          <p>
            크리스탈 포레스트는 한 사람의 손끝에서 시작됐어요. 낡은 나무 테이블 위에 투명한
            비즈를 펼쳐두고, 곰돌이의 얼굴을 떠올리며 하나씩 꿰어 나갑니다. 어떤 날은 라일락이,
            어떤 날은 벚꽃이 먼저 피어나요.
          </p>
          <p>
            모든 곰돌이는 100% 수작업으로 만들어져요. 기계가 만들 수 없는 작은 실수와 숨결이
            피스마다 담깁니다. 그래서 세상에 꼭 하나밖에 없어요.
          </p>
          <div style={{ display: "flex", gap: 32, marginTop: 36 }}>
            <Stat n="·9" label="flowers bloomed" />
            <Stat n="·100%" label="handmade" />
            <Stat n="·7~14" label="days of making" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--cf-serif)",
          fontSize: 44,
          fontStyle: "italic",
          lineHeight: 1,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--cf-ink-soft)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
