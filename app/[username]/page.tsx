import { notFound } from "next/navigation";
import { ChallengeCard } from "@/components/challenge-card";
import { StoryUpdate } from "@/components/story-update";
import { challenges, updates } from "@/lib/demo";
import { routeToUsername } from "@/lib/username";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username: routeValue } = await params;
  return { title: "@" + routeToUsername(routeValue) };
}
export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username: routeValue } = await params;
  if (!routeValue.startsWith("@")) notFound();
  const username = routeToUsername(routeValue);
  const userChallenges = challenges.filter((item) => item.username.toLocaleLowerCase() === username.toLocaleLowerCase());
  const userUpdates = updates.filter((item) => item.username.toLocaleLowerCase() === username.toLocaleLowerCase());
  return (
    <>
      <section className="profile-head">
        <div className="profile-handle">@{username}</div>
        <p className="hero-copy">Following goals all the way to their outcome.</p>
        <div className="stats"><span><strong>128</strong> Following</span><span><strong>8.4K</strong> Followers</span></div>
        <div style={{ marginTop: 24 }}><button className="button primary">Follow</button></div>
      </section>
      <nav className="tabs" aria-label="Profile sections"><a href="#challenges">Challenges</a><a href="#updates">Updates</a><a href="#replies">Replies</a></nav>
      <section id="challenges" className="section">
        <div className="section-head"><h2>Challenges</h2></div>
        <div className="grid">{(userChallenges.length ? userChallenges : challenges.slice(0,2)).map((challenge) => <ChallengeCard key={challenge.slug} challenge={challenge} />)}</div>
      </section>
      <section id="updates" className="section">
        <div className="section-head"><h2>Updates</h2></div>
        <div className="story-list">{(userUpdates.length ? userUpdates : updates.slice(0,2)).map((update) => <StoryUpdate key={update.id} update={update} />)}</div>
      </section>
    </>
  );
}
