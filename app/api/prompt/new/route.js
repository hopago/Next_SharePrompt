import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, tag, prompt });

        await newPrompt.save();

        return new NextResponse(JSON.stringify(newPrompt), { status: 201 });
    } catch (err) {
        return new NextResponse("Failed to create a new prompt", { status: 500 });
    }
}
