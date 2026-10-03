import { prisma } from "../src/lib/db_client";
import { isEligible, type Profile } from "../src/lib/matcher";

async function main() {
  const schemes = await prisma.scheme.findMany();

  const people: { label: string; profile: Profile }[] = [
    {
      label: "Farmer, 40, Uttar Pradesh",
      profile: { age: 40, state: "Uttar Pradesh", occupation: "farmer" },
    },
    {
      label: "Student, 20, Uttar Pradesh",
      profile: { age: 20, state: "Uttar Pradesh", occupation: "student" },
    },
    {
      label: "Only age given (30)",
      profile: { age: 30 },
    },
        {
      label: "Student, 20, OBC, income 2 lakh, Uttar Pradesh",
      profile: {
        age: 20,
        state: "Uttar Pradesh",
        socialCategory: "OBC",
        annualIncome: 200000,
        occupation: "student",
      },
    },
    {
      label: "Elder, 65, Bihar",
      profile: { age: 65, state: "Bihar" },
    },
        {
      label: "Elder, 65, Uttar Pradesh",
      profile: { age: 65, state: "Uttar Pradesh" },
    },
    {
      label: "Student, 20, General category, income 5 lakh",
      profile: {
        age: 20,
        socialCategory: "GENERAL",
        annualIncome: 500000,
        occupation: "student",
      },
    },

  ];

  for (const person of people) {
    console.log("---", person.label);
    for (const scheme of schemes) {
      const result = isEligible(person.profile, scheme);
      console.log(scheme.nameEn, "->", result);
    }
  }
}

main().finally(() => prisma.$disconnect());