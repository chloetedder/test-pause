export async function POST(request: Request) {
  const body = await request.json();

  const teamId = body.teamId;
  await fetch(
    `https://api.vercel.com/v1/projects/prj_suxaOaYmfhRQAdK5E9wGVzYm9kqn/pause?teamId=team_4GKTJqIoaKhD67QvM5qEXe7M`,
    {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  return new Response("Project paused");
}
