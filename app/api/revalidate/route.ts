import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const tag = request.nextUrl.searchParams.get("tag");

  if (!body?.secret || !tag) {
    return new Response(JSON.stringify({ message: "Invalid payload" }), {
      status: 400,
    });
  }

  if (body?.secret !== process.env.REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: "Unauthorized request" }), {
      status: 401,
    });
  }

  revalidateTag(tag);

  return new Response(
    JSON.stringify({ status: 200, revalidated: true, now: Date.now() })
  );
}
