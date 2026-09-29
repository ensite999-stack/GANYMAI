import Link from "next/link";
import { percent, type Challenge } from "@/lib/demo";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const progress = percent(challenge.current, challenge.target);
  return (
    <Link className="card" href={"/c/" + challenge.slug}>
      <div className="card-top">
        <div>
          <div className="handle">@{challenge.username}</div>
          <h3>{challenge.title}</h3>
        </div>
        <span className="pill">{challenge.joined ? challenge.joined.toLocaleString() + " joined" : "solo"}</span>
      </div>
      <div>
        <div className="progress-row">
          <strong>{progress}%</strong>
          <span className="muted">{challenge.current.toLocaleString()} / {challenge.target.toLocaleString()} {challenge.unit}</span>
        </div>
        <div className="progress-track" aria-label={progress + "% complete"}>
          <div className="progress-bar" style={{ width: progress + "%" }} />
        </div>
      </div>
    </Link>
  );
}
