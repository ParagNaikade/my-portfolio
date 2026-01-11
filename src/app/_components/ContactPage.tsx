"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Recaptcha = dynamic(() => import("@/components/Recaptcha"), { ssr: false });

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Please verify reCAPTCHA.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          "g-recaptcha-response": token,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="max-w-xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Get in Touch</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        Whether you&apos;re reaching out for a collaboration, opportunity, or a quick chat —
        I&apos;d love to hear from you.
      </p>

      {status === "success" && (
        <p className="mb-6 text-green-600 dark:text-green-400 font-medium">
          Thank you! Your message has been sent.
        </p>
      )}
      {status === "error" && (
        <p className="mb-6 text-red-600 dark:text-red-400 font-medium">
          Oops! Something went wrong. Try again later.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
          />
        </div>

        <Recaptcha onChange={(t) => setToken(t)} />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
