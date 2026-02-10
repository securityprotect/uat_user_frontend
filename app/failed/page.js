"use client";

import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function FailedPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const retry = async () => {
    const appId = localStorage.getItem("applicationId") || "";
    if (!appId) {
      setError("Missing applicationId.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${BASE_URL}/api/payment/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId }),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentUrl) {
        setError(data?.error || data?.message || "Retry failed");
        return;
      }

      window.location.href = data.paymentUrl;
    } catch (e) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <h2>Payment Failed</h2>
      <p>Please try again.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={retry}
        disabled={loading}
        style={{ padding: "12px 14px", cursor: "pointer" }}
      >
        {loading ? "Redirecting..." : "Retry Payment"}
      </button>
    </div>
  );
}
