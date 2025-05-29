import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) return setErr("Wrong credentials");
    const { token } = await res.json();
    localStorage.setItem("jwt", token);
    nav("/admin");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand">
      <form onSubmit={submit} className="space-y-4 rounded-lg bg-brand-soft p-10">
        <h2 className="text-xl font-bold text-white">Admin login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
               className="w-full rounded bg-brand-lighter p-2 text-white" />
        <input type="password" value={password} onChange={(e) => setPw(e.target.value)} placeholder="Password"
               className="w-full rounded bg-brand-lighter p-2 text-white" />
        {err && <p className="text-sm text-red-400">{err}</p>}
        <button className="w-full rounded bg-white p-2 font-semibold text-brand">Login</button>
      </form>
    </main>
  );
}