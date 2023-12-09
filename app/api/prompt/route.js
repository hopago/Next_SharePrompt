import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectToDB();
        
        const prompts = await Prompt.find({}).populate("creator");

        return new NextResponse(JSON.stringify(prompts), { status: 201 });
    } catch (err) {
        return new NextResponse("Failed to fetch prompts...", { status: 500 });
    }
}
