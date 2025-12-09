export default async function handler(req, res) {
  const { message } = req.body;

  console.log("Received message:", req);

  const response = await fetch(process.env.AWS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  res.status(200).json(data);
}
