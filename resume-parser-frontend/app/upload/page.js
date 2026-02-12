"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  // Protect route
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/");
      }
    };
    checkUser();
  }, [router]);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a resume file");
      return;
    }

    // Temporary save (frontend only)
    localStorage.setItem("resume_name", file.name);
    alert("Resume uploaded (next: parsing)");

    // later: send file to backend
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Upload Resume
        </h1>

        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-4"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600"
        >
          Upload Resume
        </button>
      </div>
    </div>
  );
}
