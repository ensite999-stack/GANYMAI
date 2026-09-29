import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";
export const metadata = { title: "Create account" };
export default function SignUpPage() {
  return (
    <div className="auth-wrap"><div>
      <div className="kicker">Join Ganymai</div><h1>Create account</h1>
      <p className="muted">One username. One public identity.</p>
      <SignUpForm />
      <p className="muted">Already have an account? <Link href="/login">Log in</Link></p>
    </div></div>
  );
}
