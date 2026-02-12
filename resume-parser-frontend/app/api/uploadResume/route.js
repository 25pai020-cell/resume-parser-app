export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resume");
    const jobDesc = formData.get("job_description");

    // Forward to your Python backend
    const response = await fetch("https://your-backend-url.com/parse_resume", {
      method: "POST",
      body: JSON.stringify({
        job_description: jobDesc,
        resume_text: await resumeFile.text(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
