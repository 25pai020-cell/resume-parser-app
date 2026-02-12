"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a resume");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDesc);

    try {
      const res = await axios.post("http://127.0.0.1:8000/parse-resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend. Make sure backend is running!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Resume Parser</h1>

      <textarea
        placeholder="Enter Job Description or keywords"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        className="border p-2 w-full max-w-md mb-4"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Upload & Parse
      </button>

      {result && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="font-bold text-lg mb-2">Extracted Skills:</h2>
          <p>{result.skills.join(", ")}</p>

          <h2 className="font-bold text-lg mt-4 mb-2">Matched Skills:</h2>
          <p>{result.matched_skills.join(", ")}</p>

          <h2 className="font-bold text-lg mt-4 mb-2">Match Score:</h2>
          <p>{result.match_score} %</p>
        </div>
      )}
    </div>
  );
}
