"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useLang, useT } from "@/components/language-provider";
import { jurisdictions } from "@/lib/jurisdictions";

export type ProfileInput = {
  age?: number;
  state?: string;
  gender?: string;
  annualIncome?: number;
  socialCategory?: string;
  occupation?: string;
};

type Option = { value: string; label: string };

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
  const t = useT();
  const lang = useLang();

  const [step, setStep] = useState(0);
  const [state, setState] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [work, setWork] = useState("");
  const [income, setIncome] = useState("");

  const lastStep = 2;

  // The value sent to the server is always the English name.
  // Only the label changes with the language.
  function regionLabel(region: { nameEn: string; nameHi: string }): string {
    if (lang === "hi") {
      return region.nameHi;
    }
    return region.nameEn;
  }

  const stateList = jurisdictions.filter((j) => j.type === "STATE");
  const territoryList = jurisdictions.filter((j) => j.type === "UNION_TERRITORY");

  const genders: Option[] = [
    { value: "MALE", label: t("genderMale") },
    { value: "FEMALE", label: t("genderFemale") },
    { value: "OTHER", label: t("genderOther") },
  ];

  const categories: Option[] = [
    { value: "GENERAL", label: t("categoryGeneral") },
    { value: "OBC", label: t("categoryObc") },
    { value: "SC", label: t("categorySc") },
    { value: "ST", label: t("categorySt") },
  ];

  const works: Option[] = [
    { value: "farmer", label: t("workFarmer") },
    { value: "student", label: t("workStudent") },
    { value: "other", label: t("workOther") },
  ];

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

  let buttonText = t("next");
  if (step === lastStep) {
    buttonText = loading ? t("searching") : t("submit");
  }

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-sm text-muted-foreground">
          {t("stepOf", { n: step + 1, total: lastStep + 1 })}
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
                {t("q1Title")}
              </h2>
              <div>
                <p className="mb-2 text-sm font-medium">{t("stateLabel")}</p>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-lg border bg-card p-3 text-sm"
                >
                  <option value="">{t("stateChoose")}</option>
                  <optgroup label={t("groupStates")}>
                    {stateList.map((region) => (
                      <option key={region.lgdCode} value={region.nameEn}>
                        {regionLabel(region)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={t("groupUts")}>
                    {territoryList.map((region) => (
                      <option key={region.lgdCode} value={region.nameEn}>
                        {regionLabel(region)}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">{t("ageLabel")}</p>
                <Input
                  type="number"
                  min={0}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={t("agePlaceholder")}
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-2xl font-semibold">
                {t("q2Title")}
              </h2>
              <p className="-mt-3 text-sm text-muted-foreground">{t("q2Hint")}</p>
              <div>
                <p className="mb-2 text-sm font-medium">{t("genderLabel")}</p>
                <ChoiceGroup options={genders} value={gender} onChange={setGender} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">{t("categoryLabel")}</p>
                <ChoiceGroup options={categories} value={category} onChange={setCategory} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-2xl font-semibold">
                {t("q3Title")}
              </h2>
              <p className="-mt-3 text-sm text-muted-foreground">{t("q3Hint")}</p>
              <div>
                <p className="mb-2 text-sm font-medium">{t("workLabel")}</p>
                <ChoiceGroup options={works} value={work} onChange={setWork} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">{t("incomeLabel")}</p>
                <Input
                  type="number"
                  min={0}
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder={t("incomePlaceholder")}
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
            {t("back")}
          </Button>
        ) : (
          <span />
        )}

        <Button onClick={handleNext} disabled={!canContinue || loading}>
          {buttonText}
          {step < lastStep && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}