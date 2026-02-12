"use client";

import { useState } from "react";

export default function Dashboard() {
  const [jobDesc, setJobDesc] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkEligibility = async () => {
    if (!jobDesc || !resumeFile) {
      alert("Job description & resume PDF required");
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDesc);
    formData.append("resume", resumeFile);

    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/match_resume/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f9ff", padding: 24 }}>
      <h1 style={{ fontSize: 32, color: "#2563eb" }}>
        Resume Parser Dashboard
      </h1>

      <textarea
        placeholder="Paste Job Description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        style={{ width: "100%", height: 120, marginTop: 20 }}
      />

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResumeFile(e.target.files[0])}
        style={{ marginTop: 20 }}
      />

      <button
        onClick={checkEligibility}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 10,
        }}
      >
        {loading ? "Checking..." : "Check Eligibility"}
      </button>

      {result && (
        <div
          style={{
            marginTop: 30,
            background: "white",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <h3>Match Score: {result.match_score}%</h3>
          <h3>{result.eligibility}</h3>
          <p>
            <strong>Matched Skills:</strong>{" "}
            {result.matched_skills.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
