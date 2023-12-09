import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator");

        return new NextResponse(JSON.stringify(prompts), { status: 200 });
    } catch (err) {
        return new NextResponse("Failed to fetch user prompts...", { status: 500 });
    }
};