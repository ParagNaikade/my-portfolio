export async function onRequestPost({ request }) {
    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return new Response(JSON.stringify({ error: "message is required" }), { status: 400, headers });
        }

        // Call your existing AWS Lambda API
        const response = await fetch(process.env.AWS_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), { status: 200, headers });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers });
    }
}
