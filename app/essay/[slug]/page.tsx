import { notFound } from 'next/navigation'
import { articles } from '@/lib/content'

export default async function Essay({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const a=articles.find(x=>x.slug===slug); if(!a) return notFound()
  return <article className="essay-page">
    <header className="essay-head"><span>{a.category}</span><h1>{a.title}</h1><p className="dek">{a.dek}</p><p className="byline">By {a.author}</p></header>
    <div className="essay-cover">Cover image / 16:9</div>
    <div className="essay-body">
      <p className="dropcap">We often speak as though the world were a stage and the individual were standing on it. That image is useful only until we notice how much of the stage is already inside us: language, weather, law, food, memory and the expectations of other people.</p>
      <p>To describe a relation is not to dissolve the person into a system. It is to ask what makes action possible, what limits it, and what responsibilities follow from being entangled with lives and places that are not our own.</p>
      <figure><div className="inline-image">Inline illustration</div><figcaption>An image can interrupt the argument without interrupting the reading rhythm.</figcaption></figure>
      <h2>Attention is a form of relation</h2><p>Attention changes scale. It makes a distant abstraction specific and a familiar object strange enough to be seen again. Essays are useful when they hold that altered scale long enough for a reader to test it.</p>
      <blockquote>Life is unfinished. So is every account of the world.</blockquote>
      <p>Ganymai treats an essay as a temporary structure: clear enough to enter, open enough to leave by another door.</p>
      <p className="article-date">Published {a.date}</p>
    </div>
  </article>
}
