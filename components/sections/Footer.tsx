import Link from "next/link";

export function Footer() {
  return (
    <footer className="cf-footer" data-screen-label="Footer">
      <div>
        <div className="logo-big">
          <em>Crystal</em> <span className="s">Forest</span>
        </div>
        <p style={{ maxWidth: 380, marginTop: 20, lineHeight: 1.8 }}>
          손으로 꿴 크리스탈 비즈 곰돌이. 꽃의 이름과 숲의 이야기를 담아, 한 점씩 엮어 보냅니다.
        </p>
      </div>
      <div>
        <h4>Explore</h4>
        <Link href="/#collection">Collection</Link>
        <Link href="/#about">About</Link>
        <Link href="/#custom">Custom Order</Link>
        <Link href="/care">Care Guide</Link>
      </div>
      <div>
        <h4>Say Hello</h4>
        <a
          href="https://instagram.com/crystal.forest.kr"
          target="_blank"
          rel="noreferrer"
        >
          @crystal.forest.kr
        </a>
        <a href="mailto:crystal.forest.kr@mail.com">crystal.forest.kr@mail.com</a>
        <span>Seoul, South Korea</span>
      </div>
      <div className="copyright">
        © 2026 Crystal Forest · All bears handmade with love · Made in the Rapunzel woods
      </div>
    </footer>
  );
}
