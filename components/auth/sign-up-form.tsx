"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "");
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const result = await authClient.signUp.email({ name: username, username, email, password });
    setPending(false);
    if (result.error) {
      setError(result.error.message ?? "Could not create account.");
      return;
    }
    router.push("/@" + encodeURIComponent(username));
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" autoComplete="username" placeholder="Mira" required />
        <span className="muted">Shown as @username. Letters, numbers, ., _ and - only; no spaces.</span>
      </div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" minLength={10} autoComplete="new-password" required /></div>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="button primary" disabled={pending}>{pending ? "Creating…" : "Create account"}</button>
    </form>
  );
}
