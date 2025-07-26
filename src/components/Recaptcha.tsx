"use client";

import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onChange: (token: string | null) => void;
};

export default function Recaptcha({ onChange }: Props) {
  return (
    <div className="my-4">
      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={onChange} />
    </div>
  );
}
