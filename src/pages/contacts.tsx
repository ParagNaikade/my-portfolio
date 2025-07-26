export default function Contact() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p>
        Email:{" "}
        <a href="mailto:daniel@example.com" className="text-blue-600">
          daniel@example.com
        </a>
      </p>
      <p>
        LinkedIn:{" "}
        <a href="https://linkedin.com/in/yourprofile" className="text-blue-600" target="_blank">
          yourprofile
        </a>
      </p>
    </main>
  );
}
