"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";



export default function JobPage() {
  const [jobDesc, setJobDesc] = useState("");
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

  const handleSubmit = () => {
  if (!jobDesc.trim()) {
    alert("Please enter Job Description");
    return;

  const skills = ["python", "java", "react", "sql", "django"];

let matchCount = 0;

skills.forEach((skill) => {
  if (jobDesc.toLowerCase().includes(skill)) {
    matchCount++;
  }
});

const matchPercent = Math.round((matchCount / skills.length) * 100);

// Save match score
localStorage.setItem("match_score", matchPercent);

  }


  if (!file) {
    alert("Please select a resume file");
    return;
  }

  // Save data
  localStorage.setItem("job_description", jobDesc);
  localStorage.setItem("resume_name", file.name);

  // ✅ ELIGIBILITY CHECK (AFTER SUBMIT)
  const jdLower = jobDesc.toLowerCase();

  if (jdLower.includes("python")) {
    localStorage.setItem(
      "eligibility",
      "✅ You are eligible for the job 🎉 Congratulations!"
    );
  } else {
    localStorage.setItem(
      "eligibility",
      "❌ You are not eligible for this job"
    );
  }

  // Redirect AFTER everything is saved
  router.push("/dashboard");


    if (!file) {
      alert("Please select a resume file");
      return;
    }

    // Temporary save (frontend demo)
    localStorage.setItem("job_description", jobDesc);
    localStorage.setItem("resume_name", file.name);

    alert("Job Description & Resume saved successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Job Description & Resume Upload
        </h1>

        {/* Job Description */}
        <label className="block font-semibold mb-2 text-gray-700">
          Job Description / Keywords
        </label>
        <textarea
          rows="6"
          placeholder="Paste job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400 mb-4"
        />

        {/* Resume Upload */}
        <label className="block font-semibold mb-2 text-gray-700">
          Upload Resume
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-2"
        />

        {file && (
          <p className="text-sm text-gray-600 mb-4">
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
