import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
export const metadata = { title: "Log in" };
export default function LoginPage() {
  return (
    <div className="auth-wrap"><div>
      <div className="kicker">Welcome back</div><h1>Log in</h1>
      <SignInForm />
      <p className="muted">New here? <Link href="/signup">Create an account</Link></p>
    </div></div>
  );
}
