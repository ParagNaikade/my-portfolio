import { Metadata } from "next";
import AboutPage from "../_components/AboutPage";

export const metadata: Metadata = {
  title: "About | Parag Naikade",
};

export default function Page() {
  return <AboutPage />;
}
