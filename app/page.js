import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 40, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 12 }}>Welcome to ParkPing</h1>
      <p style={{ color: "#cbd5e1", lineHeight: 1.6 }}>
        Submit your details to activate your smart vehicle contact card. Once your
        application is accepted, you will be redirected to complete payment securely.
      </p>

      <div style={{ marginTop: 24 }}>
        <Link href="/apply" className="primaryButton">
          Start Application
        </Link>
      </div>
    </main>
  );
}
