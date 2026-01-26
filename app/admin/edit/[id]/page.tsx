import { buildMetadata } from "@/lib/seo";

import EditorClient from "./EditorClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export const metadata = buildMetadata("Edit Post", "Edit an existing post.");


export default async function Page({ params }: PageProps) {
    const param = await params;
    return (
        <div style={{ height: "100vh" }}>
            <EditorClient id={param.id} />
        </div>
    );
}
