import Link from 'next/link'
import { articles } from '@/lib/content'

export default function Home(){
  return <>
    <section className="hero"><div className="eyebrow">GANYMAI / ESSAYS</div><h1>People are never outside the world they describe.</h1><p>Clear, vivid writing on the relations that bind a person to nature, power, memory, history and other people.</p></section>
    <section className="feature-grid">
      <article className="feature-main"><div className="image-placeholder">Cover image</div><span>{articles[0].category}</span><h2><Link href={`/essay/${articles[0].slug}`}>{articles[0].title}</Link></h2><p>{articles[0].dek}</p><small>{articles[0].author}</small></article>
      <div className="feature-side">{articles.slice(1,3).map(a=><article key={a.slug}><span>{a.category}</span><h3><Link href={`/essay/${a.slug}`}>{a.title}</Link></h3><p>{a.dek}</p><small>{a.author}</small></article>)}</div>
    </section>
    <section className="latest"><div className="section-rule"><h2>Latest essays</h2></div>{articles.map(a=><article className="row" key={a.slug}><div><span>{a.category}</span><h3><Link href={`/essay/${a.slug}`}>{a.title}</Link></h3><p>{a.dek}</p></div><div className="row-meta"><p>{a.author}</p><p>{a.date}</p></div></article>)}</section>
    <section className="manifesto"><p>Ganymai comes from the Ancient Greek <em>γάνυμαι</em>: to brighten up, to be glad. The name is not a promise of optimism. It is a reminder that attention can make the world more vivid.</p><Link href="/about">About Ganymai →</Link></section>
  </>
}
