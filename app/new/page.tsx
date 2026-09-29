export const metadata = { title: "Start a challenge" };
export default function NewChallengePage() {
  return (
    <section className="page">
      <div className="kicker">Start</div>
      <h1 className="page-title">What do you want to do?</h1>
      <form className="form">
        <div className="field"><label htmlFor="title">Challenge</label><input id="title" name="title" placeholder="Build my first product" /></div>
        <div className="field">
          <label htmlFor="mode">How will you know you are done?</label>
          <select id="mode" name="mode" defaultValue="number">
            <option value="number">Reach a number</option><option value="period">Keep going for a period</option><option value="outcome">Complete something</option>
          </select>
        </div>
        <div className="field"><label htmlFor="why">Why are you doing this?</label><textarea id="why" name="why" rows={6} placeholder="Tell people why this matters to you." /></div>
        <label><input type="checkbox" defaultChecked /> Public</label>
        <label><input type="checkbox" defaultChecked /> Let others join</label>
        <button className="button primary" type="button">Start challenge</button>
      </form>
    </section>
  );
}
