"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import ProfileForm, { type ProfileInput } from "@/components/ProfileForm";
import ResultsList, { type SchemeResult } from "@/components/ResultsList";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<SchemeResult[] | null>(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(profile: ProfileInput) {
    setLoading(true);
    setMessage("");
    setMatches(null);

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: profile }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "Something went wrong. Please try again.");
      } else if (data.needsMoreInfo) {
        setMessage("Please fill in your age and state.");
      } else {
        setMatches(data.matches);
      }
    } catch {
      setMessage("Could not reach the server. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-6 p-4">
      <ThemeToggle />
      <header>
        <h1 className="text-2xl font-bold">YojanaMitra</h1>
        <p className="text-gray-400">
          Find government schemes you may qualify for in Uttar Pradesh and
          Bihar.
        </p>
      </header>

      <ProfileForm onSubmit={handleSubmit} loading={loading} />

      {message !== "" && <p className="text-red-600">{message}</p>}

      {matches !== null && <ResultsList matches={matches} />}
    </main>
  );
}