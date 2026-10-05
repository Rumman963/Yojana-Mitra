"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export type ProfileInput = {
  age?: number;
  state?: string;
  gender?: string;
  annualIncome?: number;
  socialCategory?: string;
  occupation?: string;
};

type Option = { value: string; label: string };

const states: Option[] = [
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Bihar", label: "Bihar" },
];

const genders: Option[] = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const categories: Option[] = [
  { value: "GENERAL", label: "General" },
  { value: "OBC", label: "OBC" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
];

const works: Option[] = [
  { value: "farmer", label: "Farmer" },
  { value: "student", label: "Student" },
  { value: "other", label: "Something else" },
];

type ChoiceGroupProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

function ChoiceGroup({ options, value, onChange }: ChoiceGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        const style = selected
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-card hover:border-primary";

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(selected ? "" : option.value)}
            className={"rounded-xl border px-4 py-3 text-sm font-medium transition " + style}
          >
            {selected && <Check className="mr-1 inline h-4 w-4" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

type WizardProps = {
  onSubmit: (profile: ProfileInput) => void;
  loading: boolean;
};

export function Wizard({ onSubmit, loading }: WizardProps) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [work, setWork] = useState("");
  const [income, setIncome] = useState("");

  const lastStep = 2;

  let canContinue = true;
  if (step === 0) {
    const ageNumber = Number(age);
    canContinue = state !== "" && age !== "" && ageNumber >= 0 && ageNumber <= 120;
  }

  function handleNext() {
    if (step < lastStep) {
      setStep(step + 1);
      return;
    }

    const profile: ProfileInput = {};
    profile.age = Number(age);
    profile.state = state;
    if (gender !== "") {
      profile.gender = gender;
    }
    if (category !== "") {
      profile.socialCategory = category;
    }
    if (work !== "") {
      profile.occupation = work;
    }
    if (income !== "") {
      profile.annualIncome = Number(income);
    }
    onSubmit(profile);
  }

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-sm text-muted-foreground">
          Step {step + 1} of {lastStep + 1}
        </p>
        <Progress value={((step + 1) / (lastStep + 1)) * 100} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-6"
        >
          {step === 0 && (
            <>
              <h2 className="font-display text-2xl font-semibold">
                Where do you live, and how old are you?
              </h2>
              <div>
                <p className="mb-2 text-sm font-medium">State</p>
                <ChoiceGroup options={states} value={state} onChange={setState} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Age</p>
                <Input
                  type="number"
                  min={0}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="For example, 35"
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-2xl font-semibold">
                A little about you
              </h2>
              <p className="-mt-3 text-sm text-muted-foreground">
                Optional. These help us find more schemes, and you can skip
                them.
              </p>
              <div>
                <p className="mb-2 text-sm font-medium">Gender</p>
                <ChoiceGroup options={genders} value={gender} onChange={setGender} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Category</p>
                <ChoiceGroup options={categories} value={category} onChange={setCategory} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-2xl font-semibold">
                Work and income
              </h2>
              <p className="-mt-3 text-sm text-muted-foreground">
                Optional. Many schemes depend on these.
              </p>
              <div>
                <p className="mb-2 text-sm font-medium">What work do you do?</p>
                <ChoiceGroup options={works} value={work} onChange={setWork} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">
                  Yearly family income in rupees
                </p>
                <Input
                  type="number"
                  min={0}
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="For example, 150000"
                />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <Button variant="ghost" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <span />
        )}

        <Button onClick={handleNext} disabled={!canContinue || loading}>
          {step < lastStep ? "Next" : loading ? "Searching..." : "Find my schemes"}
          {step < lastStep && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}