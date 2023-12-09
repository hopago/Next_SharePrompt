import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) return new NextResponse("Prompt not found...", { status: 404 });

        return new NextResponse(JSON.stringify(prompt), { status: 200 });
    } catch (err) {
        return new NextResponse("Failed to fetch a prompt...", { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();

        const updatedPrompt = await Prompt.findById(params.id);
        if (!updatedPrompt) return new NextResponse("Prompt not found...", { status: 404 });

        updatedPrompt.prompt = prompt;
        updatedPrompt.tag = tag;

        await updatedPrompt.save();

        return new NextResponse(JSON.stringify(updatedPrompt), { status: 201 });
    } catch (err) {
        return new NextResponse("Failed to update a prompt...", { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectToDB();

        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
        if (!deletedPrompt) return new NextResponse("Prompt not found...", { status: 404 });

        return new NextResponse("Prompt has been deleted...", { status: 201 });
    } catch (err) {
        return new NextResponse("Failed to fetch a prompt...", { status: 500 });
    }
}