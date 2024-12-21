import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    // Basic input validation
    if (!text || typeof text !== "string" || text.length > 1000) {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const apiKey = request.headers.get("MODAL-API-KEY");

    if (apiKey !== process.env.CLIENT_TOKEN_1) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(
      "https://wingding12--sd-demo-model-generate.modal.run/"
    );
    url.searchParams.set("prompt", text);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "MODAL-API-KEY": process.env.CLIENT_TOKEN_1 || "",
        Accept: "image/jpeg",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response:", errorText);

      // Handle content policy violations specifically
      if (response.status === 400) {
        return NextResponse.json(
          { success: false, error: errorText },
          { status: 400 }
        );
      }

      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const imageBuffer = await response.arrayBuffer();

    const filename = `${crypto.randomUUID()}.jpg`;

    const blob = await put(filename, imageBuffer, {
      access: "public",
      contentType: "image/jpeg",
    });

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
