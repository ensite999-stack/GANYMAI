import type { Metadata } from 'next'
import { BrandName } from '@/components/BrandName'

export const metadata:Metadata={
  title:'Subscribe',
  description:'Subscribe to receive new Ganymai essays by email.',
  alternates:{canonical:'/subscribe'}
}

export default function Page(){return <section className="text-page"><div className="eyebrow">SUBSCRIBE</div><h1>Read <BrandName /> by email.</h1><p>Newsletter subscriptions are being prepared. When enabled, subscription data will be handled under the <a href="/privacy">Privacy Policy</a>.</p></section>}
