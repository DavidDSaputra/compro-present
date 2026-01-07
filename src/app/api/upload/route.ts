import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG are allowed." },
                { status: 400 }
            );
        }

        // Create unique filename
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const extension = file.name.split(".").pop();
        const filename = `partner-${timestamp}.${extension}`;

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads", "partners");
        await mkdir(uploadDir, { recursive: true });

        // Write file
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return the public URL
        const url = `/uploads/partners/${filename}`;

        return NextResponse.json({ url, filename });
    } catch (error) {
        console.error("Failed to upload file:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
