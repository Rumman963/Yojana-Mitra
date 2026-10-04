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