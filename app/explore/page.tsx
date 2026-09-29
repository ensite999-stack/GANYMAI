import { ChallengeCard } from "@/components/challenge-card";
import { challenges } from "@/lib/demo";
export const metadata = { title: "Explore" };
export default function ExplorePage() {
  return (
    <section className="page">
      <div className="kicker">Explore</div>
      <h1 className="page-title">Find a story before you know the ending.</h1>
      <div className="grid">{challenges.map((challenge) => <ChallengeCard key={challenge.slug} challenge={challenge} />)}</div>
    </section>
  );
}
