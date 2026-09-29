import Link from 'next/link'
import { BrandName } from '@/components/BrandName'

export default function Home(){
  return <>
    <section className="hero">
      <div className="eyebrow"><BrandName /> / ESSAYS</div>
      <h1>People are never outside the world they describe.</h1>
      <p>Clear, vivid writing on the relations that bind a person to nature, power, memory, history and other people.</p>
    </section>
    <section className="manifesto home-manifesto">
      <p><BrandName /> comes from the Ancient Greek <em>γάνυμαι</em>: to brighten up, to be glad. The name is not a promise of optimism. It is a reminder that attention can make the world more vivid.</p>
      <Link href="/about">About <BrandName /> →</Link>
    </section>
  </>
}
