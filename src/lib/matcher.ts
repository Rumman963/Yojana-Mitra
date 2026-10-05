import type { Scheme } from "@/generated/prisma/client";
import type { Gender, SocialCategory } from "@/generated/prisma/enums";

// What we know about the person
export type Profile = {
  age?: number;
  state?: string;
  gender?: Gender;
  annualIncome?: number;
  socialCategory?: SocialCategory;
  occupation?: string;
};

export type MatchDetails = {
  reasons: string[];
  toConfirm: string[];
};

export function isEligible(profile: Profile, scheme: Scheme): boolean {
  // State schemes only apply to people living in that state
  if (scheme.level === "STATE" && profile.state !== scheme.state) {
    return false;
  }

  // Age
  if (profile.age !== undefined) {
    if (scheme.minAge !== null && profile.age < scheme.minAge) {
      return false;
    }
    if (scheme.maxAge !== null && profile.age > scheme.maxAge) {
      return false;
    }
  }

  // Gender
  if (scheme.gender !== null && profile.gender !== undefined) {
    if (profile.gender !== scheme.gender) {
      return false;
    }
  }

  // Income
  if (scheme.maxAnnualIncome !== null && profile.annualIncome !== undefined) {
    if (profile.annualIncome > scheme.maxAnnualIncome) {
      return false;
    }
  }

  // Social category
  if (scheme.socialCategories.length > 0 && profile.socialCategory !== undefined) {
    if (!scheme.socialCategories.includes(profile.socialCategory)) {
      return false;
    }
  }

  // Occupation
   if (scheme.occupations.length > 0) {
    if (profile.occupation === undefined) {
      return false;
    }
    if (!scheme.occupations.includes(profile.occupation)) {
      return false;
    }
  }
  


  return true;
}

export function explainMatch(profile: Profile, scheme: Scheme): MatchDetails {
  const reasons: string[] = [];
  const toConfirm: string[] = [];

  // State
  if (scheme.level === "STATE") {
    reasons.push("You live in " + scheme.state);
  }

  // Age
  if (scheme.minAge !== null || scheme.maxAge !== null) {
    if (profile.age === undefined) {
      toConfirm.push("Your age");
    } else if (scheme.minAge !== null && scheme.maxAge !== null) {
      reasons.push("Your age fits the " + scheme.minAge + " to " + scheme.maxAge + " years range");
    } else if (scheme.minAge !== null) {
      reasons.push("You are " + scheme.minAge + " or older");
    } else {
      reasons.push("You are " + scheme.maxAge + " or younger");
    }
  }

  // Gender
  if (scheme.gender !== null) {
    if (profile.gender === undefined) {
      toConfirm.push("Your gender");
    } else {
      reasons.push("This scheme is open to your gender");
    }
  }

  // Income
  if (scheme.maxAnnualIncome !== null) {
    const limit = scheme.maxAnnualIncome.toLocaleString("en-IN");
    if (profile.annualIncome === undefined) {
      toConfirm.push("Your yearly family income (limit Rs " + limit + ")");
    } else {
      reasons.push("Your income is within the Rs " + limit + " limit");
    }
  }

  // Social category
  if (scheme.socialCategories.length > 0) {
    if (profile.socialCategory === undefined) {
      toConfirm.push("Your category");
    } else {
      reasons.push("Your category (" + profile.socialCategory + ") is covered");
    }
  }

  // Work
  if (scheme.occupations.length > 0 && profile.occupation !== undefined) {
    reasons.push("Your work (" + profile.occupation + ") matches");
  }

  return { reasons: reasons, toConfirm: toConfirm };
}