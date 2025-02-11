"use client";

import { useEffect, useState } from "react";
import Document from "@/components/Document";

export default function DocumentPage({
  params: paramsPromise,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    // Resolve the params promise when the component mounts
    const fetchParams = async () => {
      const params = await paramsPromise;
      setId(params.id);
    };

    fetchParams();
  }, [paramsPromise]); // Dependency on paramsPromise

  if (id === null) {
    // Optionally, show loading state
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}
