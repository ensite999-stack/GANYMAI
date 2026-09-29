import Link from "next/link";
import { ChallengeCard } from "@/components/challenge-card";
import { StoryUpdate } from "@/components/story-update";
import { challenges, updates } from "@/lib/demo";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <div className="kicker">Challenge-driven stories</div>
          <h1>Every goal has a story.</h1>
          <p className="hero-copy">Start something that matters to you. Show the process, the setbacks, the progress, and what happens in the end.</p>
          <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
            <Link className="button primary" href="/new">Start a challenge</Link>
            <Link className="button" href="/explore">Explore stories</Link>
          </div>
        </div>
        <div className="hero-side">
          <div className="kicker">Live journey</div>
          <div className="metric">47/100</div>
          <p className="muted">Mira is building her first product in public.</p>
          <Link href="/c/build-my-first-product">Follow the story →</Link>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div><div className="kicker">In progress</div><h2>Stories worth following</h2></div>
          <Link className="muted" href="/explore">View all →</Link>
        </div>
        <div className="grid">{challenges.map((challenge) => <ChallengeCard key={challenge.slug} challenge={challenge} />)}</div>
      </section>
      <section className="section">
        <div className="section-head"><div><div className="kicker">Latest</div><h2>The story moves</h2></div></div>
        <div className="story-list">{updates.map((update) => <StoryUpdate key={update.id} update={update} />)}</div>
      </section>
    </>
  );
}
