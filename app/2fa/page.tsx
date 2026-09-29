export const metadata = { title: "Two-factor authentication" };
export default function TwoFactorPage() {
  return (
    <div className="auth-wrap">
      <div className="form">
        <div><div className="kicker">Security</div><h2 style={{ fontSize: 38, marginBottom: 8 }}>Two-factor authentication</h2>
        <p className="muted">TOTP verification and single-use recovery-code entry are the next authentication milestone.</p></div>
      </div>
    </div>
  );
}
