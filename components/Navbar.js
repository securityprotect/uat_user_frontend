import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        padding: "16px 24px",
        borderBottom: "1px solid #1e293b",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Link href="/" style={{ fontWeight: 700 }}>
        ParkPing
      </Link>
      <Link href="/apply">Apply</Link>
    </header>
  );
}
