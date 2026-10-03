import type { Metadata } from 'next'
import { BrandName } from '@/components/BrandName'

export const metadata:Metadata={
  title:'Contact',
  description:'Contact Ganymai for editorial, rights and general enquiries.',
  alternates:{canonical:'/contact'}
}

export default function Page(){return <section className="text-page"><div className="eyebrow">CONTACT</div><h1>Contact <BrandName />.</h1><p>Editorial, rights and general enquiries: <a href="mailto:hello@Ganymai.com">hello@Ganymai.com</a></p></section>}
