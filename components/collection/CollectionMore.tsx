import Link from "next/link";

export function CollectionMore() {
  return (
    <div className="cf-collection-more reveal">
      <Link href="/collection" className="cf-view-all">
        <span className="cf-view-all-label">View all collection</span>
        <span className="cf-view-all-arrow">→</span>
      </Link>
    </div>
  );
}
