import type { Metadata } from 'next'
import { BrandName } from '@/components/BrandName'

export const metadata:Metadata={
  title:'Accessibility Statement',
  description:'Ganymai accessibility goals, supported interactions and how to report an accessibility problem.',
  alternates:{canonical:'/accessibility'}
}

export default function Page(){
  return <section className="text-page legal-page">
    <div className="eyebrow">ACCESSIBILITY</div>
    <h1>Accessibility statement.</h1>
    <p className="legal-updated">Last updated: 3 October 2026</p>

    <p><BrandName /> aims to make its essays, navigation and editorial experience usable by as many people as reasonably possible, including people who use keyboards, screen readers, browser zoom or other assistive technology.</p>

    <h2>What we aim to support</h2>
    <ul>
      <li>Keyboard-accessible links, buttons and visible focus states.</li>
      <li>Semantic headings and landmark structure where practical.</li>
      <li>Readable text that can be enlarged with browser zoom.</li>
      <li>Colour contrast that does not rely on colour alone to communicate essential meaning.</li>
      <li>Alternative text or captions for editorial images where appropriate and available.</li>
    </ul>

    <h2>Standards</h2>
    <p>We use WCAG 2.2 Level AA as a reference point for ongoing improvements where it is practical for the site and its editorial material. This statement is not a claim that every page or third-party item fully conforms at all times.</p>

    <h2>Known limitations</h2>
    <p>Older or externally sourced media may have incomplete alternative descriptions, and third-party destinations linked from articles are outside our control. We review issues as they are identified.</p>

    <h2>Feedback</h2>
    <p>If a page or feature is difficult to use, email <a href="mailto:hello@Ganymai.com">hello@Ganymai.com</a> with the page address, the problem you encountered and, if useful, the browser or assistive technology you were using.</p>
  </section>
}
