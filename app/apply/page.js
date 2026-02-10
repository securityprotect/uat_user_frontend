"use client";

import { useMemo, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const PLANS = [
  { id: "INDIVIDUAL", label: "Individual", amount: 99 },
  { id: "FAMILY", label: "Family", amount: 199 },
  { id: "PREMIUM", label: "Premium", amount: 499 },
];

export default function ApplyPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    plan: "INDIVIDUAL",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedPlan = useMemo(
    () => PLANS.find((p) => p.id === form.plan) || PLANS[0],
    [form.plan]
  );

  const isFormValid =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.vehicle.trim() !== "";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async () => {
    if (!BASE_URL) {
      setError("NEXT_PUBLIC_API_BASE_URL not configured.");
      return;
    }

    if (!isFormValid) {
      setError("Please fill all required details.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const payload = {
        ...form,
        amount: selectedPlan.amount,
      };

      const res = await fetch(`${BASE_URL}/api/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentUrl || !data.applicationId) {
        setError(data?.error || data?.message || "Failed to initiate payment.");
        return;
      }

      localStorage.setItem("applicationId", data.applicationId);
      window.location.href = data.paymentUrl;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h2 style={{ marginBottom: 10 }}>Apply</h2>
      <p style={{ marginTop: 0, color: "#666" }}>
        Fill details and complete payment. After payment, admin approval is required.
      </p>

      <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <input
          type="text"
          name="vehicle"
          placeholder="Vehicle Number"
          value={form.vehicle}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <select
          name="plan"
          value={form.plan}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          {PLANS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label} - ₹{p.amount}
            </option>
          ))}
        </select>

        {error && <p style={{ color: "red", marginTop: 6 }}>{error}</p>}

        <button
          onClick={submit}
          disabled={isSubmitting || !isFormValid}
          style={{
            padding: "12px 14px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Redirecting..." : `Pay ₹${selectedPlan.amount} & Apply`}
        </button>
      </div>
    </div>
  );
}
