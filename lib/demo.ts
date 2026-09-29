export type Challenge = {
  slug: string; title: string; username: string;
  mode: "quantity" | "streak" | "outcome";
  current: number; target: number; unit: string; followers: number; joined: number;
};
export type StoryUpdate = {
  id: string; challengeSlug: string; challengeTitle: string;
  username: string; marker: string; text: string; time: string;
};
export const challenges: Challenge[] = [
  { slug: "build-my-first-product", title: "Build my first product", username: "Mira", mode: "streak", current: 47, target: 100, unit: "days", followers: 8421, joined: 0 },
  { slug: "run-1000-km", title: "Run 1,000 km this year", username: "north.star", mode: "quantity", current: 683, target: 1000, unit: "km", followers: 4100, joined: 238 },
  { slug: "one-ton-cleanup", title: "Clean one ton of shoreline waste", username: "Ocean-Lab", mode: "quantity", current: 742, target: 1000, unit: "kg", followers: 12900, joined: 2481 },
  { slug: "publish-first-book", title: "Publish my first book", username: "Lin_Writes", mode: "outcome", current: 3, target: 5, unit: "milestones", followers: 1902, joined: 0 }
];
export const updates: StoryUpdate[] = [
  { id: "u1", challengeSlug: "build-my-first-product", challengeTitle: "Build my first product", username: "Mira", marker: "DAY 47 / 100", text: "Today someone paid for the product for the first time. The amount is small. The proof is not.", time: "2h" },
  { id: "u2", challengeSlug: "one-ton-cleanup", challengeTitle: "Clean one ton of shoreline waste", username: "Ocean-Lab", marker: "74% COMPLETE", text: "Twenty-seven people showed up before sunrise. Together they removed another 43 kg.", time: "5h" },
  { id: "u3", challengeSlug: "publish-first-book", challengeTitle: "Publish my first book", username: "Lin_Writes", marker: "MILESTONE 3 / 5", text: "The first full draft exists. It is rough, too long, and finally real.", time: "1d" }
];
export function percent(current: number, target: number) {
  return Math.min(100, Math.round((current / target) * 100));
}
