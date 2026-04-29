const INSTAGRAM_URL = "https://instagram.com/crystal.forest.kr";

export function Custom() {
  return (
    <section className="cf-custom" id="custom" data-screen-label="Custom">
      <div className="reveal">
        <span className="lead">just for you</span>
        <h2>
          <em>
            나만의 곰돌이,
            <br />
            주문 제작
          </em>
        </h2>
        <p
          style={{
            maxWidth: 600,
            margin: "28px auto 0",
            color: "var(--cf-ink-soft)",
            lineHeight: 1.9,
          }}
        >
          기념일, 결혼 선물, 아기의 탄생. 좋아하는 색과 이름, 사연을 들려주시면 당신만의 곰돌이를
          한 땀 한 땀 엮어 드려요.
        </p>
      </div>
      <div className="cf-custom-steps reveal-stagger">
        <Step
          n="01."
          title="DM으로 이야기해요"
          body="좋아하는 색, 전하고 싶은 마음, 받을 분의 이미지를 편하게 들려주세요. 인스타그램 @crystal.forest.kr 으로요."
        />
        <Step
          n="02."
          title="스케치와 견적"
          body="수채 스케치로 미리 보여드려요. 비즈 조합·크기·리본 색을 함께 정하고, 제작 일정을 안내드립니다."
        />
        <Step
          n="03."
          title="손으로, 천천히"
          body="보통 2~3주. 작은 손편지와 벨벳 파우치에 담아 보내드려요. 도착 순간을 오래 기다리세요."
        />
      </div>
      <a
        className="cf-btn"
        style={{ marginTop: 72 }}
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
      >
        인스타그램 DM으로 문의하기
      </a>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="cf-step">
      <div className="cf-step-n">{n}</div>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
}
