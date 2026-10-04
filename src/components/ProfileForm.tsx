"use client";

import { useState } from "react";

export type ProfileInput = {
  age?: number;
  state?: string;
  gender?: string;
  annualIncome?: number;
  socialCategory?: string;
  occupation?: string;
};

type Props = {
  onSubmit: (profile: ProfileInput) => void;
  loading: boolean;
};

export default function ProfileForm({ onSubmit, loading }: Props) {
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState("");
  const [occupation, setOccupation] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const profile: ProfileInput = {};

    if (age !== "") {
      profile.age = Number(age);
    }
    if (state !== "") {
      profile.state = state;
    }
    if (gender !== "") {
      profile.gender = gender;
    }
    if (income !== "") {
      profile.annualIncome = Number(income);
    }
    if (category !== "") {
      profile.socialCategory = category;
    }
    if (occupation.trim() !== "") {
      profile.occupation = occupation.trim().toLowerCase();
    }

    onSubmit(profile);
  }

  const boxStyle = "w-full rounded border border-gray-300 p-2";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>
        Age
        <input
          type="number"
          required
          min={0}
          max={120}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={boxStyle}
        />
      </label>

      <label>
        State
        <select
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
          className={boxStyle}
        >
          <option value="">Choose your state</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Bihar">Bihar</option>
        </select>
      </label>

      <label>
        Gender (optional)
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={boxStyle}
        >
          <option value="">Prefer not to say</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </label>

      <label>
        Yearly family income in rupees (optional)
        <input
          type="number"
          min={0}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className={boxStyle}
        />
      </label>

      <label>
        Category (optional)
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={boxStyle}
        >
          <option value="">Prefer not to say</option>
          <option value="GENERAL">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>
      </label>

    <label>
        What work do you do? (optional)
        <select
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          className={boxStyle}
        >
          <option value="">Prefer not to say</option>
          <option value="farmer">Farmer</option>
          <option value="student">Student</option>
          <option value="other">Something else</option>
        </select>
      </label>

     
     
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-green-700 p-3 text-white disabled:opacity-50"
      >
        {loading ? "Searching..." : "Find schemes"}
      </button>
    </form>
  );
}