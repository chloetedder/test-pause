import { createHmac } from "crypto";

export async function POST(request: Request) {
  // Get the signature from headers
  const signature = request.headers.get("x-vercel-signature");
  // Get the raw body
  const body = await request.json();

  // Create a hash using your VERCEL_WEBHOOK_SECRET
  const hashedBody = createHmac(
    "sha256",
    process.env.CHLOE_VERCEL_WEBHOOK_SECRET
  )
    .update(body)
    .digest("hex");

  // Compare the hash with the signature
  if (hashedBody !== signature) {
    return new Response("Invalid signature", { status: 403 });
  }

  const teamId = body.teamId;
  const chloeTeamId = "team_dgaAS8fMTBKOMjRHVjOzeIy9";
  const chloeProjId = "prj_JUnrCTHR7HajYMVA7B1bNG7oWoKe";
  await fetch(
    `https://api.vercel.com/v1/projects/${chloeProjId}/pause?teamId=${chloeTeamId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CHLOE_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  return new Response("Project paused");
}
