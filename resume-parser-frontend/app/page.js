"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  if (!email || !password) return setError("Enter email and password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return setError(error.message);
  if (data?.user) router.push("/dashboard");
};
<button
  onClick={async () => {
    const { data, error } = await supabase.from("profiles").select("*").limit(1);
    console.log(data, error);
  }}
>
  Test Supabase
</button>


  // ✅ Inline CSS styles
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
      fontFamily: '"Segoe UI", sans-serif',
      padding: "24px",
    },
    card: {
      background: "white",
      padding: "32px",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      fontSize: "2rem",
      color: "#2563eb",
      marginBottom: "16px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "16px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1",
      fontSize: "1rem",
    },
    btn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background 0.2s",
    },
    btnHover: {
      backgroundColor: "#1e40af",
    },
    error: {
      color: "red",
      marginBottom: "12px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.btn}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
