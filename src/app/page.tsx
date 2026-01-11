import { Metadata } from "next";
import HomePage from "./_components/HomePage";

export const metadata: Metadata = {
  title: "Parag Naikade | Senior Full-Stack Engineer (.NET, React, AWS, Azure)",
  description:
    "Senior Full-Stack Engineer specialising in .NET, React, AWS and Azure. Experience leading teams and delivering scalable cloud solutions.",
};

export default function Page() {
  return <HomePage />;
}
