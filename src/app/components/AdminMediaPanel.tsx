"use client";

import { useState } from "react";
import ImageUpload from "@/app/components/ImageUpload";

export default function AdminMediaPanel() {
  const [projectId, setProjectId] = useState<string>("temp-project-id");

  const handleUpload = (image: any) => {
    console.log("Uploaded:", image);
  };

  return <ImageUpload projectId={projectId} onSuccess={handleUpload} />;
}
