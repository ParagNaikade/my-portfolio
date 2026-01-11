import { Metadata } from "next";
import ContactPage from "../_components/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Parag Naikade",
};

export default function Page() {
  return <ContactPage />;
}
