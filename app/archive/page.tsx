import {articles} from '@/lib/content'
import Link from 'next/link'
export default function Archive(){return <section className="text-page archive-page"><div className="eyebrow">ARCHIVE</div><h1>Essays</h1>{articles.map(a=><div className="archive-item" key={a.slug}><span>{a.date}</span><div><small>{a.category}</small><h2><Link href={`/essay/${a.slug}`}>{a.title}</Link></h2><p>{a.dek}</p></div></div>)}</section>}
