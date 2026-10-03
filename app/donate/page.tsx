import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata:Metadata={
  title:'Support',
  description:'Support independent essays and learn about Ganymai donation principles.',
  alternates:{canonical:'/donate'}
}

export default function Page(){return <section className="text-page"><div className="eyebrow">SUPPORT</div><h1>Support independent essays.</h1><p>Ganymai is built around independent editorial work. Details about donations, editorial independence and donor expectations are set out in our <Link href="/donation-statement">Donation Statement</Link>.</p></section>}
