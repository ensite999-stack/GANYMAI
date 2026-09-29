import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryUpdate } from "@/components/story-update";
import { challenges, percent, updates } from "@/lib/demo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = challenges.find((item) => item.slug === slug);
  return { title: challenge?.title ?? "Challenge" };
}
export default async function ChallengePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = challenges.find((item) => item.slug === slug);
  if (!challenge) notFound();
  const progress = percent(challenge.current, challenge.target);
  const story = updates.filter((item) => item.challengeSlug === challenge.slug);
  return (
    <>
      <section className="challenge-hero">
        <div className="kicker">Challenge · {challenge.mode}</div>
        <h1>{challenge.title}</h1>
        <Link className="handle" href={"/@" + challenge.username}>@{challenge.username}</Link>
        <div className="big-progress">{progress}%</div>
        <div className="progress-row"><strong>{challenge.current.toLocaleString()} {challenge.unit}</strong><span className="muted">Goal {challenge.target.toLocaleString()} {challenge.unit}</span></div>
        <div className="progress-track"><div className="progress-bar" style={{ width: progress + "%" }} /></div>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button className="button primary">Follow story</button>
          {challenge.joined > 0 && <button className="button">Join challenge</button>}
        </div>
      </section>
      <section className="section">
        <div className="section-head"><h2>Story</h2></div>
        <div className="story-list">
          {story.length ? story.map((item) => <StoryUpdate key={item.id} update={item} />) : <div className="story"><div className="muted">The first update has not been posted yet.</div></div>}
        </div>
      </section>
    </>
  );
}
