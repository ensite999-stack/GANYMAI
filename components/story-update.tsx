import Link from "next/link";
import type { StoryUpdate as StoryUpdateType } from "@/lib/demo";

export function StoryUpdate({ update }: { update: StoryUpdateType }) {
  return (
    <article className="story">
      <div>
        <div className="story-title">{update.marker}</div>
        <Link className="handle" href={"/c/" + update.challengeSlug}>{update.challengeTitle}</Link>
      </div>
      <div className="story-text">{update.text}</div>
      <div className="story-meta"><Link href={"/@" + update.username}>@{update.username}</Link> · {update.time}</div>
    </article>
  );
}
