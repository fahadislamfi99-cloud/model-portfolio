"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-[#EFE8E6] p-8 sm:p-10 shadow-xl rounded-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#EFE8E6] flex items-center justify-center mx-auto mb-3 text-[#D85E78]">
            <Lock className="w-5 h-5" />
          </div>
          <span className="font-editorial-serif text-2xl tracking-[0.16em] text-[#1A1718] block">
            COMATOZZE
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#7A7273] font-sans block mt-1">
            SECURE EDITORIAL PORTAL
          </span>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] mb-2 font-medium"
            >
              ADMIN MASTER PASSWORD
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter security key..."
              className="w-full bg-[#FAF8F5] border border-[#EFE8E6] focus:border-[#1A1718] p-3 text-sm text-[#1A1718] outline-none transition-colors rounded-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1A1718] hover:bg-[#D85E78] text-white text-[11px] tracking-[0.25em] font-sans uppercase font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-60 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <>
                <span>ENTER DASHBOARD</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-center text-[#A09899] font-sans mt-6">
          Encrypted session · Rate limited · IP protected
        </p>
      </div>
    </div>
  );
}
