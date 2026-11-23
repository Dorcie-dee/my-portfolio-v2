import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { readToken } from "@/sanity/lib/token";

const enableDraftMode = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});

/**
 * Turns on draft mode for the Presentation tool in /manage. Only succeeds with the one-time
 * secret Studio creates for a signed-in project member; anyone else is refused.
 * Without the server-only Viewer token, preview is simply unavailable.
 */
export async function GET(request: Request) {
  if (!readToken) {
    return new Response("Preview is not configured.", { status: 501 });
  }
  return enableDraftMode.GET(request);
}
