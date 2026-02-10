"use client";

import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SuccessPage() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    applicationId: "",
    paymentStatus: "",
    applicationStatus: "",
  });

  useEffect(() => {
    const appId = localStorage.getItem("applicationId") || "";
    if (!appId) {
      setState((s) => ({ ...s, loading: false, error: "Missing applicationId." }));
      return;
    }

    const run = async () => {
      try {
        if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL not configured.");

        const res = await fetch(`${BASE_URL}/api/payment/status?applicationId=${encodeURIComponent(appId)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || data?.message || "Status check failed");
        }

        setState({
          loading: false,
          error: "",
          applicationId: appId,
          paymentStatus: data.payment?.status || "",
          applicationStatus: data.application?.status || "",
        });
      } catch (e) {
        setState((s) => ({ ...s, loading: false, error: e.message || "Error" }));
      }
    };

    run();
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <h2>Payment Received</h2>

      {state.loading && <p>Checking status...</p>}

      {!state.loading && state.error && (
        <p style={{ color: "red" }}>{state.error}</p>
      )}

      {!state.loading && !state.error && (
        <div style={{ marginTop: 12 }}>
          <p><b>Application ID:</b> {state.applicationId}</p>
          <p><b>Payment Status:</b> {state.paymentStatus || "UNKNOWN"}</p>
          <p><b>Application Status:</b> {state.applicationStatus || "UNKNOWN"}</p>

          <p style={{ marginTop: 16, color: "#666" }}>
            If payment is SUCCESS and status is PAID_PENDING_APPROVAL, wait for admin approval.
          </p>
        </div>
      )}
    </div>
  );
}
